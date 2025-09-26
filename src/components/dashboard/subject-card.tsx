import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import * as React from 'react';

interface SubjectCardProps {
  title: string;
  description: string;
  href: string;
  image?: ImagePlaceholder;
  icon?: React.ReactNode;
}

export function SubjectCard({ title, description, href, image, icon }: SubjectCardProps) {
  return (
    <Card className="flex flex-col bg-secondary hover:border-primary/50 transition-all duration-300">
      <CardHeader>
        {image && (
          <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
        {icon && (
            <div className="flex items-center justify-center h-48 w-full mb-4 bg-background/50 rounded-lg">
                {React.cloneElement(icon as React.ReactElement, { className: "h-24 w-24 text-foreground/80" })}
            </div>
        )}
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Link href={href} className="w-full">
          <Button className="w-full">
            Teste Başla
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
