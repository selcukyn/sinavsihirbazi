import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function StatsCard() {
  const questionsSolved = 125;
  const accuracy = 78;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">İstatistikler</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="font-medium text-foreground/80">Toplam Çözülen Soru</span>
          <span className="font-bold text-foreground text-xl">{questionsSolved}</span>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-foreground/80">Doğruluk Oranı</span>
            <span className="font-bold text-primary text-xl">{accuracy}%</span>
          </div>
          <Progress value={accuracy} />
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Türkçe: 80 Soru</span>
          <span>Matematik: 45 Soru</span>
        </div>
      </CardContent>
    </Card>
  );
}
