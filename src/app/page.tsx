import { SubjectCard } from '@/components/dashboard/subject-card';
import { StatsCard } from '@/components/dashboard/stats-card';
import { HistoryCard } from '@/components/dashboard/history-card';
import {
  PlaceHolderImages,
  type ImagePlaceholder,
} from '@/lib/placeholder-images';
import { Book, BrainCircuit } from 'lucide-react';

const subjects: {
  title: string;
  description: string;
  href: string;
  id: string;
  icon?: React.ReactNode;
}[] = [
  {
    title: 'Matematik Pratiği',
    description: 'Temel ve ileri düzey matematik konularında yüzlerce soruyla pratik yapın.',
    href: '/practice/mathematics',
    id: 'mathematics',
  },
  {
    title: 'Türkçe Pratiği',
    description: 'Dil bilgisi, paragraf anlama ve yazım kuralları üzerine kendinizi test edin.',
    href: '/practice/turkish',
    id: 'turkish',
  },
  {
    title: 'ALES Denemesi',
    description:
      'ALES formatındaki deneme sınavıyla zaman yönetimi ve soru çözme becerilerinizi geliştirin.',
    href: '/practice/ales',
    id: 'ales',
    icon: <BrainCircuit />,
  },
];

export default function HomePage() {
  const getImageForSubject = (id: string): ImagePlaceholder | undefined => {
    return PlaceHolderImages.find((img) => img.id === id);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Book className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold font-headline">
            Sınav Sihirbazı
          </h1>
        </div>
      </div>
      <p className="text-muted-foreground mb-8">
        Yapay zeka destekli kişiselleştirilmiş sorularla sınavlara hazırlanın.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            title={subject.title}
            description={subject.description}
            href={subject.href}
            image={getImageForSubject(subject.id)}
            icon={subject.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StatsCard />
        <HistoryCard />
      </div>
    </div>
  );
}
