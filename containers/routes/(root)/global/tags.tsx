'use client';

import { Post } from '@/types/post';
import { useRouter, useSearchParams } from 'next/navigation';
import { authors } from '@/constants/authors';
import { category } from '@/constants/category';

interface TagsProps {
  data: Post;
}

export const Tags = ({ data }: TagsProps) => {
  if (!data.authors || !Array.isArray(data.authors)) {
    return null;
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {data.authors.map((author) => (
        <div
          key={author}
          className="border text-sm bg-card text-card-foreground py-1.5 px-3 rounded-md transition-colors"
        >
          {(() => {
            const authorData = authors.find((a) => a.en === author);
            const categoryData = category.find((c) => c.en === data.category);
            return `${authorData!.fa} / ${categoryData!.fa}`;
          })()}
        </div>
      ))}
    </div>
  );
};
