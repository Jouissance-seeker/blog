'use client';

import { Post } from '@/types/post';
import { authors } from '@/constants/authors';
import { category } from '@/constants/category';
import { useQueryState } from 'nuqs';
import { useRouter } from 'next/navigation';

interface TagsProps {
  data: Post;
}

export const Tags = ({ data }: TagsProps) => {
  const [, setTitle] = useQueryState('title', { defaultValue: '' });
  const [, setAuthors] = useQueryState('authors', { defaultValue: '' });
  const [, setCategory] = useQueryState('category', { defaultValue: '' });
  const router = useRouter();
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

  const handleClick = async () => {
    await setTitle('');
    await setAuthors(data.authors.join(','));
    await setCategory(data.category);
    router.push('/');
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
