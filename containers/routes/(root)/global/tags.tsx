'use client';

import { Post } from '@/types/post';
import { authors } from '@/constants/authors';
import { category } from '@/constants/category';

interface TagsProps {
  data: Post;
}

export const Tags = ({ data }: TagsProps) => {
  if (!data.authors || !Array.isArray(data.authors)) {
    return null;
  }

  const categoryData = category.find((c) => c.en === data.category);
  const authorNames = data.authors
    .map((author) => {
      const authorData = authors.find((a) => a.en === author);
      return authorData!.fa;
    })
    .join(' - ');

  return (
    <div className="flex gap-2 flex-wrap">
      <div className="border text-sm bg-card text-card-foreground py-1.5 px-3 rounded-md transition-colors">
        {`${authorNames} / ${categoryData!.fa}`}
      </div>
    </div>
  );
};
