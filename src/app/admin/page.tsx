import { QuestionTable } from '@/components/admin/question-table';
import { FilePlus } from 'lucide-react';

export default function AdminPage() {
  return (
    <>
      <div className="flex items-center gap-4">
        <FilePlus className="h-8 w-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          Soru Yönetimi
        </h1>
      </div>
      <p className="text-muted-foreground">
        Buradan soruları yönetebilir, yeni sorular ekleyebilir, mevcutları düzenleyebilir veya silebilirsiniz.
      </p>
      <div className="mt-4">
        <QuestionTable />
      </div>
    </>
  );
}
