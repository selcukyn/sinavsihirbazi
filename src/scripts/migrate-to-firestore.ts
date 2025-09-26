/**
 * Bu script, yerel JSON/TS dosyalarındaki soruları ve çözümleri alır,
 * ve Firestore'daki 'questions' koleksiyonuna aktarır.
 * Ayrıca, başlangıç için bir admin ve bir öğrenci kullanıcısı oluşturur.
 * Script, veritabanında zaten var olan ID'li belgeleri atlayarak
 * mükerrer kaydı önler.
 *
 * Kullanım: `npm run migrate`
 */

import { db } from '../src/lib/firebase';
import { collection, getDocs, setDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import * as bcrypt from 'bcrypt';
import { questions as sampleQuestions } from '../src/lib/questions';
import alesQuestionsRaw from '../src/lib/questions_from_pdf.json';
import solutionCache from '../src/lib/solution-cache.json';
import type { Question, RawAlesQuestion, User, UserRole } from '../src/lib/types';

// Type for a better structured solution cache
interface SolutionCache {
  [key: string]: string;
}
const typedSolutionCache = solutionCache as SolutionCache;

// Add correctOptionId to ALES questions from the solution cache
const processedAlesQuestions: RawAlesQuestion[] = (alesQuestionsRaw as RawAlesQuestion[]).map(question => {
    const questionId = `ales-${question.questionNumber}`;
    const solution = typedSolutionCache[questionId];

    if (solution && !question.correctOptionId) {
      const firstLine = solution.split('\n')[0];
      const match = firstLine.match(/Doğru Cevap: \*\*([A-E])\*\*/i);
      if (match && match[1]) {
        return {
          ...question,
          correctOptionId: match[1].toLowerCase()
        };
      }
    }
    return question;
  });


// Transforms the raw ALES questions into the standard Question format
const transformAlesQuestions = (rawQuestions: RawAlesQuestion[]): Question[] => {
  return rawQuestions.map((q) => ({
    id: `ales-${q.questionNumber}`,
    questionNumber: q.questionNumber,
    subject: 'ales',
    question: q.questionText,
    options: Object.entries(q.options).map(([key, value]) => ({
      id: key.toLowerCase(),
      text: value as string,
    })),
    correctOptionId: q.correctOptionId?.toLowerCase() || '',
    text: q.questionText,
    answer: typedSolutionCache[`ales-${q.questionNumber}`] || '',
  }));
};

const allLocalQuestions: Question[] = [
  ...sampleQuestions.map((q) => ({
    ...q,
    correctOptionId: q.correctOptionId?.toLowerCase(),
    answer: typedSolutionCache[q.id] || '',
  })),
  ...transformAlesQuestions(processedAlesQuestions),
];

async function migrateQuestions() {
  console.log('Soru göçü işlemi başladı...');
  const questionsCollectionRef = collection(db, 'questions');
  const querySnapshot = await getDocs(questionsCollectionRef);
  const existingQuestionIds = new Set(querySnapshot.docs.map((doc) => doc.id));
  console.log(`${existingQuestionIds.size} adet soru veritabanında mevcut.`);

  let newQuestionsCount = 0;

  for (const question of allLocalQuestions) {
    if (!question.id) {
        console.warn('ID olmadan soru atlanıyor:', question);
        continue;
    }
    
    if (!existingQuestionIds.has(question.id)) {
        const questionDocRef = doc(db, 'questions', question.id);
        const { createdAt, ...questionData } = question;
        
        if (questionData.correctOptionId) {
            questionData.correctOptionId = questionData.correctOptionId.toLowerCase();
        } else {
             console.warn(`UYARI: Soru ${question.id} için correctOptionId bulunamadı. Boş bırakılıyor.`);
        }

        await setDoc(questionDocRef, {
            ...questionData,
            createdAt: new Date() 
        });
        newQuestionsCount++;
    }
  }

  if (newQuestionsCount > 0) {
    console.log(`✅ Başarıyla ${newQuestionsCount} yeni soru Firestore'a eklendi!`);
  } else {
    console.log('✨ Soru veritabanı zaten güncel. Yeni soru eklenmedi.');
  }
}

async function migrateUsers() {
    console.log('\nKullanıcı göçü işlemi başladı...');
    
    const usersToCreate = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'ogrenci', password: 'ogrenci123', role: 'ogrenci' },
    ];

    let newUsersCount = 0;
    let updatedUsersCount = 0;

    for (const user of usersToCreate) {
        const userDocRef = doc(db, 'users', user.username);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await setDoc(userDocRef, {
                username: user.username,
                password: hashedPassword,
                role: user.role,
                status: 'active'
            });
            console.log(`- Kullanıcı oluşturuldu: ${user.username} (rol: ${user.role})`);
            newUsersCount++;
        } else {
            const userData = userDoc.data() as User;
            if (!userData.status) {
                await updateDoc(userDocRef, { status: 'active' });
                console.log(`- Mevcut kullanıcı güncellendi: ${user.username} (status: 'active' eklendi)`);
                updatedUsersCount++;
            } else {
                console.log(`- Kullanıcı zaten mevcut ve güncel: ${user.username}`);
            }
        }
    }

    if (newUsersCount > 0) {
        console.log(`✅ Başarıyla ${newUsersCount} yeni kullanıcı Firestore'a eklendi!`);
    }
    if (updatedUsersCount > 0) {
        console.log(`✅ Başarıyla ${updatedUsersCount} mevcut kullanıcı güncellendi!`);
    }
    if (newUsersCount === 0 && updatedUsersCount === 0) {
        console.log('✨ Kullanıcı veritabanı zaten güncel. Yeni kullanıcı eklenmedi veya güncellenmedi.');
    }
}


async function migrateAll() {
    console.log('Firestore veri göçü işlemi başladı...');
    await migrateQuestions();
    await migrateUsers();
    console.log('\nTüm göç işlemleri tamamlandı!');
}

migrateAll().catch(error => {
    console.error('HATA: Göç işlemi sırasında bir sorun oluştu.', error);
    console.error('Lütfen Firebase projenizin doğru yapılandırıldığından ve Firestore\'un etkin olduğundan emin olun.');
});
