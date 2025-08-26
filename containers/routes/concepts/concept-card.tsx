import Link from 'next/link';
import { Concept } from '@/types/concept';
import { Tag } from './concept-tag';
import { Card, CardContent, CardFooter, CardHeader } from '@/uis/card';
import { ArrowUpLeft } from 'lucide-react';

interface ConceptCardProps {
  concept: Concept;
  number: number;
}

export const ConceptCard = ({ concept, number }: ConceptCardProps) => {
  return (
    <Card className="grid group relative grid-rows-[auto_auto_1fr_auto] rounded-2xl overflow-hidden">
      <CardHeader className="flex p-2.5 justify-between gap-3 border-b">
        <div className="flex justify-between w-full items-center gap-3">
          <h2 className="font-bold">
            <Link href={`/concepts/${concept.author}/${concept.slug}`}>
              {concept.title}
            </Link>
          </h2>
          <div className="border size-7.5 flex items-center justify-center rounded-sm text-smp pt-1">
            {number + 1}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground px-2.5 py-3 text-justify text-smp">
          {concept.summary}
        </p>
      </CardContent>
      <CardFooter className="border-t flex items-start justify-between p-2.5">
        <Tag data={concept} />
        <Link
          href={`/concepts/${concept.author}/${concept.slug}`}
          className="border group/link h-fit whitespace-nowrap flex gap-1 items-center bg-card text-card-foreground group hover:bg-accent hover:text-accent-foreground z-10 relative px-2.5 p-1.5 rounded-md"
        >
          <p className="text-sm text-foreground">مشاهده بیشتر</p>
          <ArrowUpLeft className="size-4 text-foreground transition-transform duration-300 group-hover/link:-rotate-45" />
        </Link>
      </CardFooter>
    </Card>
  );
};
