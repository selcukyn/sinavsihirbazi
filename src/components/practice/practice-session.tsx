'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Question, Subject, Option } from '@/lib/types';
import { SolutionModal } from './solution-modal';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '../ui/progress';

interface PracticeSessionProps {
  allQuestions: Question[];
  subject: Subject | 'ales';
}

export function PracticeSession({ allQuestions, subject }: PracticeSessionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Map<string, string>>(new Map());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentQuestion = useMemo(() => allQuestions[currentQuestionIndex], [allQuestions, currentQuestionIndex]);
  const userAnswer = useMemo(() => userAnswers.get(currentQuestion.id), [userAnswers, currentQuestion.id]);
  const isAnswered = !!userAnswer;

  const correctAnswer = useMemo(() => {
    return currentQuestion?.correctOptionId;
  }, [currentQuestion]);

  const handleOptionClick = (optionId: string) => {
    if (isAnswered) return; // Don't allow changing answers
    const newAnswers = new Map(userAnswers);
    newAnswers.set(currentQuestion.id, optionId);
    setUserAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getOptionClass = (option: Option) => {
    const isSelected = option.id === userAnswer;
    const isCorrect = option.id === correctAnswer;

    if (isAnswered) {
      if (isCorrect) {
        return "border-green-400 bg-green-500/20 text-green-300 hover:bg-green-500/30 font-semibold shadow-lg shadow-green-500/30";
      }
      if (isSelected && !isCorrect) {
        return "border-red-400 bg-red-500/20 text-red-300 hover:bg-red-500/30 line-through font-semibold shadow-lg shadow-red-500/30";
      }
    }
    return "border-border bg-card hover:bg-accent/50 text-foreground/80";
  };
  
  const totalCorrect = useMemo(() => {
    return Array.from(userAnswers.entries()).reduce((acc, [questionId, selectedId]) => {
      const question = allQuestions.find(q => q.id === questionId);
      if (question && question.correctOptionId === selectedId) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [userAnswers, allQuestions]);
  
  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;
  
  const questionText = currentQuestion.question || currentQuestion.text;

  if (!isClient) {
    // Render a skeleton or loading state on the server
    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader className="p-4"></CardHeader>
                <CardContent className="p-4 pt-0"></CardContent>
                <CardFooter className="p-4 pt-0"></CardFooter>
            </Card>
        </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-transparent border-0 shadow-none">
        <CardHeader className="p-2 pb-2">
          <div className='flex justify-between items-center mb-2'>
            <CardDescription>Soru {currentQuestionIndex + 1} / {allQuestions.length}</CardDescription>
            <Badge variant="secondary">{totalCorrect} Doğru</Badge>
          </div>
          <Progress value={progress} className="h-2" />
          <CardTitle className="pt-4 !text-xl !font-normal leading-relaxed text-foreground/90 whitespace-pre-wrap">
             {questionText}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 pt-2">
          <div className="flex flex-col space-y-3">
            {currentQuestion.options.map((option) => {
              const optionText = option.text.startsWith(`${option.id.toUpperCase()})`) 
                ? option.text.substring(option.text.indexOf(')') + 1).trim() 
                : option.text;

              return (
                <Button
                  key={option.id}
                  variant="outline"
                  className={cn("h-auto min-h-0 py-3 whitespace-normal justify-start text-left px-3 transition-all duration-300 text-lg", getOptionClass(option))}
                  onClick={() => handleOptionClick(option.id)}
                  disabled={isAnswered}
                >
                  <span className="font-bold mr-3">{option.id.toUpperCase()}.</span>
                  <span className="flex-1">{optionText}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row justify-between gap-2 p-2 pt-4">
            <div className='flex gap-2 w-full sm:w-auto'>
                <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Önceki
                </Button>
                <Button onClick={handleNext} disabled={currentQuestionIndex === allQuestions.length - 1}>
                    Sonraki
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
            
            <div className='flex gap-2 w-full sm:w-auto'>
                 <SolutionModal question={currentQuestion} subject={subject} />
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
