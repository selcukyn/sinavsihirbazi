'use server';
/**
 * @fileOverview A flow for generating solutions to questions.
 *
 * - generateSolution - A function that generates a solution for a given question.
 * - GenerateSolutionInput - The input type for the generateSolution function.
 * - GenerateSolutionOutput - The return type for the generateSolution function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSolutionInputSchema = z.object({
  question: z.string().describe('The formatted question and prompt for the AI.'),
});
export type GenerateSolutionInput = z.infer<typeof GenerateSolutionInputSchema>;

export type GenerateSolutionOutput = string;

export async function generateSolution(input: GenerateSolutionInput): Promise<GenerateSolutionOutput> {
  return generateSolutionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSolutionPrompt',
  input: {schema: GenerateSolutionInputSchema},
  prompt: `{{{question}}}`,
});

const generateSolutionFlow = ai.defineFlow(
  {
    name: 'generateSolutionFlow',
    inputSchema: GenerateSolutionInputSchema,
    outputSchema: z.string(),
  },
  async input => {
    console.log("ADIM 3: Yapay zeka flow'una girildi.");
    const {text} = await prompt(input);
    console.log("ADIM 5: Yapay zekadan cevap alındı. Cevap:", text);
      
    if (!text) {
      console.error('KRİTİK HATA: AI modeli boş veya tanımsız bir metin döndürdü.');
      throw new Error('AI returned null or undefined text.');
    }
    
    console.log("ADIM 6: Flow'dan sonuç döndürülüyor.");
    return text;
  }
);
