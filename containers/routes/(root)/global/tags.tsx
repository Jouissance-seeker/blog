'use client';

import { Post } from '@/types/post';
import { useRouter, useSearchParams } from 'next/navigation';
import { authors } from '@/constants/authors';
import { category } from '@/constants/category';

interface TagsProps {
  data: Post;
}

export const Tags = ({ data }: TagsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!data.authors || !Array.isArray(data.authors)) {
    return null;
  }

  const handleAuthorClick = (author: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('authors', author);
    params.set('category', data.category);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {data.authors.map((author) => (
        <button
          onClick={() => handleAuthorClick(author)}
          key={author}
          className="border text-sm bg-card text-card-foreground py-1.5 px-3 rounded-md hover:bg-accent transition-colors cursor-pointer"
        >
          {(() => {
            const authorData = authors.find((a) => a.en === author);
            const categoryData = category.find((c) => c.en === data.category);
            return `${authorData!.fa} / ${categoryData!.fa}`;
          })()}
        </button>
      ))}
    </div>
  );
};
