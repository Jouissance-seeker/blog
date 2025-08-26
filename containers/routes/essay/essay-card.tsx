import Link from 'next/link';
import { Essay } from '@/types/essay';
import { authors } from '@/constants/authors';
import { Tag } from '../global/tag';

interface EssayCardProps {
  essay: Essay;
  number: number;
}

export const EssayCard = ({ essay, number }: EssayCardProps) => {
  const authorNames = essay.authors
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
            <span className="bg-primary/10 text-primary px-2 py-1 rounded">
              جستار
            </span>
            <span>{number + 1}</span>
          </div>
          <Link
            href={`/essays/${essay.authors.join('-')}/${essay.slug}`}
            className="block group"
          >
            <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {essay.title}
            </h2>
          </Link>
          <p className="text-sm text-muted-foreground mb-3">{essay.summary}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{authorNames}</span>
            <Tag data={essay} />
          </div>
        </div>
      </div>
    </article>
  );
};
