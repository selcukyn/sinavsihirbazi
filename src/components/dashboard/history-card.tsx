import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';

const mockHistory = [
  { id: 1, subject: 'Matematik', correct: true, question: 'Bir arabanın ortalama hızı...' },
  { id: 2, subject: 'Türkçe', correct: false, question: 'Hangisinde yazım yanlışı vardır?' },
  { id: 3, subject: 'Matematik', correct: true, question: 'x + y toplamı kaçtır?' },
];

export function HistoryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Soru Geçmişi</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockHistory.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {item.correct ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
                <div>
                  <p className="font-medium truncate max-w-[200px] sm:max-w-xs text-foreground/80">{item.question}</p>
                </div>
              </div>
              <Badge variant={item.subject === 'Matematik' ? 'default' : 'secondary'} 
                     className={`font-semibold text-xs`}>
                {item.subject}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
