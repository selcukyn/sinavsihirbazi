import fs from 'fs';
import path from 'path';

// Define interfaces for type safety
interface Question {
  questionNumber: number;
  questionText: string;
  options: { [key: string]: string };
  correctOptionId?: string; // This is what we'll add
}

interface SolutionCache {
  [key: string]: string;
}

const solutionCachePath = path.join(process.cwd(), 'src/lib/solution-cache.json');
const questionsPath = path.join(process.cwd(), 'src/lib/questions_from_pdf.json');

try {
  // 1. Read files
  const solutionCacheContent = fs.readFileSync(solutionCachePath, 'utf-8');
  const solutionCache: SolutionCache = JSON.parse(solutionCacheContent);

  const questionsContent = fs.readFileSync(questionsPath, 'utf-8');
  const questionsData: Question[] = JSON.parse(questionsContent);

  // 2. Process and update questions
  const updatedQuestions = questionsData.map(question => {
    const questionId = `ales-${question.questionNumber}`;
    const solution = solutionCache[questionId];

    if (solution) {
      const firstLine = solution.split('\n')[0];
      const match = firstLine.match(/Doğru Cevap: \*\*([A-E])\*\*/i);
      if (match && match[1]) {
        return {
          ...question,
          correctOptionId: match[1].toLowerCase()
        };
      }
    }
    return question; // Return original question if no solution/match
  });

  // 3. Write the updated data back
  fs.writeFileSync(questionsPath, JSON.stringify(updatedQuestions, null, 2), 'utf-8');

  console.log('Successfully updated questions_from_pdf.json with correct answer IDs.');

} catch (error) {
  console.error('An error occurred:', error);
}
