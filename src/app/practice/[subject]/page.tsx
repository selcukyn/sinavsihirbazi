import type { Subject, Question } from '@/lib/types';
import { PracticeSession } from '@/components/practice/practice-session';
import { notFound } from 'next/navigation';
import { BrainIcon } from '@/components/icons';
import { getQuestions } from '@/lib/services/questions.service';

interface PracticePageProps {
  params: {
    subject: Subject | 'ales';
  };
}

export async function generateStaticParams() {
  // This can be improved by fetching unique subjects from the database
  return [
    { subject: 'mathematics' },
    { subject: 'turkish' },
    { subject: 'ales' },
  ];
}

export default async function PracticePage({ params }: PracticePageProps) {
  const { subject } = params;
  
  const allQuestions = await getQuestions();

  let subjectQuestions: Question[];
  let subjectTitle: string;

  if (subject === 'ales') {
    subjectQuestions = allQuestions.filter((q) => q.subject === 'ales');
    subjectTitle = 'ALES Denemesi';
  } else {
    subjectQuestions = allQuestions.filter((q) => q.subject === subject);
    subjectTitle =
      subject === 'mathematics' ? 'Matematik' : 'Türkçe Pratiği';
  }

  if (!subjectQuestions || subjectQuestions.length === 0) {
    // We might want to show a message instead of a 404
    // if there are just no questions for that subject yet.
    notFound();
  }

  return (
    <div className="flex-1 w-full py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mb-4 text-foreground">
          <BrainIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-center">
            {subjectTitle}
          </h1>
        </div>
        <PracticeSession allQuestions={subjectQuestions} subject={subject} />
      </div>
    </div>
  );
}
