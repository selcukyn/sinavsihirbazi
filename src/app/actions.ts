'use server';

import { redirect } from 'next/navigation';
import * as bcrypt from 'bcrypt';
import type { Question, User } from '@/lib/types';
import { generateSolution } from '@/ai/flows/generate-solution';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getUserByUsername, addUser, updateUser } from '@/lib/services/user.service';
import { createSession, deleteSession } from '@/lib/session';

export async function loginAction(prevState: any, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
        return { success: false, error: 'Kullanıcı adı ve şifre zorunludur.' };
    }

    const user = await getUserByUsername(username);

    if (!user) {
        return { success: false, error: 'Geçersiz kullanıcı adı veya şifre.' };
    }

    // --- KENDİNİ ONARMA MEKANİZMASI ---
    // Eğer kullanıcının status alanı yoksa, bu eski bir kayıttır.
    // Kullanıcıyı 'active' olarak güncelle ve işleme devam et.
    if (!user.status) {
        try {
            await updateUser(user.id!, { status: 'active' });
            user.status = 'active'; // In-memory objeyi de güncelle
            console.log(`Kullanıcı '${username}' 'status: active' olarak güncellendi.`);
        } catch (updateError) {
             console.error(`Kullanıcı '${username}' güncellenirken hata:`, updateError);
             return { success: false, error: 'Kullanıcı durumu güncellenirken bir hata oluştu.' };
        }
    }
    // --- BİTİŞ ---

    if (user.status !== 'active') {
        return { success: false, error: 'Bu kullanıcı hesabı aktif değil.' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password!);

    if (!passwordMatch) {
        return { success: false, error: 'Geçersiz kullanıcı adı veya şifre.' };
    }

    await createSession({
        userId: user.id!,
        username: user.username,
        role: user.role,
    });

    redirect('/');
}

export async function logoutAction() {
    await deleteSession();
    redirect('/login');
}


export async function addUserAction(prevState: any, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as 'admin' | 'ogrenci';

    if (!username || !password || !role) {
        return { success: false, error: 'Tüm alanlar zorunludur.' };
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
        return { success: false, error: 'Bu kullanıcı adı zaten mevcut.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await addUser({
        username,
        password: hashedPassword,
        role,
        status: 'active',
    });
    
    return { success: true, message: `Kullanıcı '${username}' başarıyla oluşturuldu.` };
}

export async function updateUserAction(prevState: any, formData: FormData) {
    const username = formData.get('id') as string;
    const role = formData.get('role') as 'admin' | 'ogrenci';
    const password = formData.get('password') as string | undefined;

    if (!username || !role) {
        return { success: false, error: 'Kullanıcı adı ve rol zorunludur.' };
    }
    
    const updateData: Partial<User> = { role };

    if (password && password.trim() !== '') {
        updateData.password = await bcrypt.hash(password, 10);
    }
    
    try {
        await updateUser(username, updateData);
        return { success: true, message: 'Kullanıcı başarıyla güncellendi.' };
    } catch(e) {
        return { success: false, error: 'Kullanıcı güncellenirken bir hata oluştu.' };
    }

}

/**
 * Bu fonksiyon, bir sorunun çözümünü getirir.
 * 1. Önce sorunun veritabanındaki kaydında 'answer' alanı olup olmadığını kontrol eder.
 * 2. Çözüm varsa, onu döndürür.
 * 3. Çözüm yoksa, yapay zeka ile canlı olarak bir çözüm üretir.
 * 4. Üretilen çözümü, gelecekteki istekler için veritabanındaki ilgili sorunun 'answer' alanına kaydeder.
 * 5. Canlı çözüm üretimi de başarısız olursa hata döner.
 */
export async function getSolutionAction(input: { question: Question }) {
  const { question } = input;

  if (question.answer && question.answer.trim() !== '') {
    return { success: true, solution: question.answer };
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      if (!question.correctOptionId) {
        console.error('HATA: Soru için correctOptionId bulunamadı.', question.id);
        return {
          success: false,
          error:
            'Bu sorunun doğru cevap bilgisi bulunamadığı için çözüm üretilemiyor.',
        };
      }

      const correctOptionId = question.correctOptionId.toUpperCase();

      const formattedQuestion = `
Aşağıdaki çoktan seçmeli soruyu, doğru cevabın '${correctOptionId}' şıkkı olduğunu bilerek, adım adım ve detaylı bir şekilde çöz. Açıklamanı, diğer seçeneklerin neden yanlış olduğunu da kısaca belirterek yap.

Lütfen cevabını Markdown formatında, aşağıdaki kurallara uyarak hazırla:
1.  İlk satıra sadece "Doğru Cevap: **${correctOptionId}**" yaz. Başka hiçbir şey ekleme.
2.  Açıklamanı, okunabilirliği artırmak için paragraflara böl.
3.  Önemli kelimeleri veya kavramları **kalın** yazarak vurgula.
4. Çözüm tamamen Türkçe olmalıdır.

---
**Soru:**
${question.question || question.text}

**Seçenekler:**
${question.options.map((option) => `- ${option.id.toUpperCase()}: ${option.text}`).join('\n')}

**Doğru Şık:** ${correctOptionId}
---
      `.trim();
      
      const result = await generateSolution({ 
        question: formattedQuestion,
      });

      const solutionText = result;

      if (solutionText) {
        try {
          const questionDocRef = doc(db, 'questions', question.id);
          await updateDoc(questionDocRef, {
            answer: solutionText,
          });
        } catch (dbError) {
          console.error(
            `KRİTİK HATA: Veritabanına çözüm kaydedilirken hata oluştu. ID: ${question.id}`,
            dbError
          );
        }
        
        return { success: true, solution: solutionText };
      } else {
        console.error('KRİTİK HATA: AI çözümü boş veya yanlış formatta.', result);
        throw new Error('AI solution response is empty or in wrong format.');
      }
    } catch (e) {
      console.error(
        `KRİTİK HATA: getSolutionAction içinde hata yakalandı. ID: ${question.id}`,
        e
      );
      return { success: false, error: 'Çözüm üretilirken bir hata oluştu.' };
    }
  }

  return {
    success: false,
    error:
      'Bu sorunun adım adım çözümü henüz mevcut değil ve şu anda üretilemiyor.',
  };
}
