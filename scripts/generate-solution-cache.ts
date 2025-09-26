/**
 * Bu script, `questions.ts` ve `questions_from_pdf.json` dosyalarındaki tüm soruları okur,
 * `solution-cache.json` dosyasında çözümü olmayanlar için yapay zeka kullanarak çözüm üretir
 * ve üretilen çözümleri önbellek dosyasına kaydeder.
 *
 * Kullanım: `npm run generate-cache`
 */
import { generateSolution } from '../src/ai/flows/generate-solution';
import { questions as sampleQuestions } from '../src/lib/questions'; 
import alesQuestionsRaw from '../src/lib/questions_from_pdf.json';
import solutionCache from '../src/lib/solution-cache.json';
import type { Question, RawAlesQuestion, Option } from '../src/lib/types';
import fs from 'fs/promises';
import path from 'path';

interface SolutionCache {
  [key: string]: string;
}

const solutionCachePath = path.resolve(process.cwd(), 'src/lib/solution-cache.json');

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
    // Ensure correctOptionId is always lowercase
    correctOptionId: q.correctOptionId?.toLowerCase() || '',
    text: q.questionText, 
  }));
};

const allQuestions: Question[] = [
    ...sampleQuestions.map(q => ({...q, correctOptionId: q.correctOptionId?.toLowerCase()})),
    ...transformAlesQuestions(alesQuestionsRaw as RawAlesQuestion[])
];


const formatQuestionForAI = (question: Question) => {
  const correctOption = question.options.find(opt => opt.id === question.correctOptionId);

  // Fallback in case correctOptionId is invalid, though it shouldn't be.
  if (!question.correctOptionId || !correctOption) {
    console.warn(`Soru ${question.id} için doğru şık ID'si ('${question.correctOptionId}') seçeneklerde bulunamadı. Atlanıyor.`);
    return null;
  }

  return `
Aşağıdaki çoktan seçmeli soruyu, doğru cevabın '${question.correctOptionId.toUpperCase()}' şıkkı olduğunu bilerek, adım adım ve detaylı bir şekilde çöz. Açıklamanı, diğer seçeneklerin neden yanlış olduğunu da kısaca belirterek yap.

Lütfen cevabını Markdown formatında, aşağıdaki kurallara uyarak hazırla:
1.  İlk satıra sadece "Doğru Cevap: **${question.correctOptionId.toUpperCase()}**" yaz. Başka hiçbir şey ekleme.
2.  Açıklamanı, okunabilirliği artırmak için paragraflara böl.
3.  Önemli kelimeleri veya kavramları **kalın** yazarak vurgula.
4. Çözüm tamamen Türkçe olmalıdır.

---
**Soru:**
${question.text || question.question}

**Seçenekler:**
${question.options.map(option => `- ${option.id.toUpperCase()}: ${option.text}`).join('\n')}

**Doğru Şık:** ${question.correctOptionId.toUpperCase()}
---
  `.trim();
}

async function generateCache() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('HATA: GEMINI_API_KEY ortam değişkeni ayarlanmamış. Lütfen .env dosyanızı kontrol edin.');
    process.exit(1);
  }

  console.log('Çözüm önbelleği oluşturma işlemi başladı...');

  const typedSolutionCache = solutionCache as SolutionCache;
  let newSolutionsCount = 0;
  const allQuestionsToProcess = allQuestions;

  for (const question of allQuestionsToProcess) {
    const questionId = question.id; // Use the direct ID (e.g., "tur-1", "ales-15")

    if (!typedSolutionCache[questionId]) {
      const formattedQuestion = formatQuestionForAI(question);
      
      // If formatting failed (e.g. no correct option), skip this question.
      if (!formattedQuestion) {
        continue;
      }

      console.log(`- ${question.subject} - Soru ${questionId} için çözüm üretiliyor...`);
      try {
        const result = await generateSolution({ 
          question: formattedQuestion, 
          // Subject can be more generic for the AI
          subject: question.subject === 'mathematics' ? 'Mathematics' : 'Turkish',
        });
        
        typedSolutionCache[questionId] = result.solution;
        newSolutionsCount++;
        
        // API rate limitlerine takılmamak için her istek arası bekleme
        console.log('  ...2 saniye bekleniyor...');
        await new Promise(resolve => setTimeout(resolve, 2000)); 

      } catch (error) {
        console.error(`  HATA: Soru ${questionId} için çözüm üretilemedi.`, error);
        // Add a placeholder to avoid re-requesting a failing question
        typedSolutionCache[questionId] = "Bu sorunun çözümü üretilirken bir hata oluştu.";
        await new Promise(resolve => setTimeout(resolve, 1000)); 
      }
    } else {
      console.log(`- ${question.subject} - Soru ${questionId} zaten önbellekte, atlanıyor.`);
    }
  }

  if (newSolutionsCount > 0) {
    console.log(`\n${newSolutionsCount} yeni çözüm üretildi. Önbellek dosyası güncelleniyor...`);
    try {
      await fs.writeFile(solutionCachePath, JSON.stringify(typedSolutionCache, null, 2));
      console.log('✅ Çözüm önbelleği başarıyla güncellendi!');
    } catch (error) {
      console.error('HATA: Önbellek dosyasına yazılamadı.', error);
    }
  } else {
    console.log('\n✨ Tüm çözümler zaten güncel. İşlem tamamlandı!');
  }
}

generateCache();
