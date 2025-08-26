import Link from 'next/link';
import { Concept } from '@/types/concept';
import { Card, CardContent, CardHeader } from '@/uis/card';

interface ConceptCardProps {
  concept: Concept;
  number: number;
}

export const ConceptCard = (props: ConceptCardProps) => {
  return (
    <Card className="grid group relative grid-rows-[auto_auto_1fr_auto] rounded-2xl overflow-hidden">
      <CardHeader className="flex p-2.5 justify-between gap-3 border-b">
        <div className="flex justify-between w-full items-center gap-3">
          <h2 className="font-bold">
            <Link href={`/concepts/${props.concept.slug}`}>
              {props.concept.title}
            </Link>
          </h2>
          <div className="border size-7.5 flex items-center justify-center rounded-sm text-smp pt-1">
            {props.number + 1}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground px-2.5 py-3 text-justify text-smp">
          {props.concept.summary}
        </p>
      </CardContent>
    </Card>
  );
};
