import Link from 'next/link';
import { Concept } from '@/types/concept';
import { Card, CardContent, CardHeader } from '@/uis/card';
import { ArrowUpLeft } from 'lucide-react';
import { authors } from '@/constants/authors';

interface ConceptCardProps {
  concept: Concept;
  number: number;
}

export const ConceptCard = (props: ConceptCardProps) => {
  return (
    <Card className="grid group relative grid-rows-[auto_auto_1fr_auto] rounded-2xl overflow-hidden">
      <CardHeader className="flex p-2.5 justify-between gap-3 border-b items-center">
        <div className="flex items-center gap-1.5 w-[calc(100%-140px)]">
          <div className="border size-7.5 flex items-center justify-center rounded-sm text-smp pt-1">
            {props.number + 1}
          </div>
          <h2 className="font-bold truncate">
            <Link href={`/concepts/${props.concept.slug}`}>
              {(() => {
                const authorKey = props.concept.slug.match(
                  /^[^-]+-[^-]+/,
                )?.[0] as keyof typeof authors;
                return authors[authorKey];
              })()}{' '}
              / {props.concept.title}
            </Link>
          </h2>
        </div>
        <Link
          href={`/concepts/${props.concept.slug}`}
          className="border group/link h-fit whitespace-nowrap flex gap-1 items-center bg-card text-card-foreground group hover:bg-accent hover:text-accent-foreground z-10 relative px-2 p-1.5 rounded-md"
        >
          <p className="text-sm text-foreground">مشاهده بیشتر</p>
          <ArrowUpLeft className="size-4 text-foreground transition-transform duration-300 group-hover/link:-rotate-45" />
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground px-2.5 py-3 text-justify text-smp">
          {props.concept.summary}
        </p>
      </CardContent>
    </Card>
  );
};
