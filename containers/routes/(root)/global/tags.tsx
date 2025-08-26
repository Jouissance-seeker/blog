'use client';

import { Post } from '@/types/post';
import { authors } from '@/constants/authors';
import { category } from '@/constants/category';
import { useQueryState } from 'nuqs';
import { useRouter, usePathname } from 'next/navigation';

interface TagsProps {
  data: Post;
}

export const Tags = ({ data }: TagsProps) => {
  const [, setAuthors] = useQueryState('authors', { defaultValue: '' });
  const [, setCategory] = useQueryState('category', { defaultValue: '' });
  const pathname = usePathname();
  const router = useRouter();
  const categoryData = category.find((c) => c.en === data.category);
  const authorNames = data.authors
    .map((author) => {
      const authorData = authors.find((a) => a.en === author);
      return authorData!.fa;
    })
    .join(' - ');
  const handleClick = async () => {
    if (pathname === '/') {
      await setAuthors(data.authors.join(','));
      await setCategory(data.category);
    } else {
      const params = new URLSearchParams();
      params.set('authors', data.authors.join(','));
      if (data.category) {
        params.set('category', data.category);
      }
      const homeUrl = `/?${params.toString()}`;
      router.push(homeUrl);
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        type="button"
        onClick={handleClick}
        className="border text-sm bg-card text-card-foreground py-1.5 px-3 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
      >
        {`${authorNames} / ${categoryData!.fa}`}
      </button>
    </div>
  );
};
