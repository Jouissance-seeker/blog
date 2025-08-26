import Link from 'next/link';
import { Concept } from '@/types/concept';
import { authors } from '@/constants/authors';
import { Tag } from '../global/tag';

interface ConceptCardProps {
  concept: Concept;
  number: number;
}

export const ConceptCard = ({ concept, number }: ConceptCardProps) => {
  const authorNames = concept.authors
    .map((author) => {
      const authorData = authors.find((a) => a.en === author);
      return authorData?.fa || author;
    })
    .join(' - ');

  return (
    <article className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span className="bg-secondary/10 text-secondary px-2 py-1 rounded">
              مفهوم
            </span>
            <span>{number + 1}</span>
          </div>
          <Link
            href={`/concepts/${concept.authors.join('-')}/${concept.slug}`}
            className="block group"
          >
            <h2 className="text-lg font-semibold mb-2 group-hover:text-secondary transition-colors">
              {concept.title}
            </h2>
          </Link>
          <p className="text-sm text-muted-foreground mb-3">
            {concept.summary}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{authorNames}</span>
            <Tag data={concept} />
          </div>
        </div>
      </div>
    </article>
  );
};
