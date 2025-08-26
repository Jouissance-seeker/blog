'use client';

import { Post } from '@/types/post';
import { authors } from '@/constants/authors';
import { useQueryState } from 'nuqs';
import { useRouter, usePathname } from 'next/navigation';
import { Concept } from '@/types/concept';
import { Essay } from '@/types/essay';

interface TagProps {
  data: Post | Essay | Concept;
}

export const Tag = ({ data }: TagProps) => {
  const [, setAuthors] = useQueryState('authors', { defaultValue: '' });
  const pathname = usePathname();
  const router = useRouter();

  // Handle different data types
  if ('authors' in data && Array.isArray(data.authors)) {
    // For Essay type with authors array
    const authorNames = data.authors
      .map((author) => {
        const authorData = authors.find((a) => a.en === author);
        return authorData?.fa || author;
      })
      .join(' - ');

    const handleClick = async () => {
      if (pathname === '/') {
        await setAuthors(data.authors.join(','));
      } else {
        const params = new URLSearchParams();
        params.set('authors', data.authors.join(','));
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
          {authorNames}
        </button>
      </div>
    );
  } else if ('author' in data && typeof data.author === 'string') {
    // For Concept type with single author
    const authorData = authors.find((a) => a.en === data.author);
    const authorName = authorData?.fa || data.author;

    const handleClick = async () => {
      if (pathname === '/') {
        await setAuthors(data.author);
      } else {
        const params = new URLSearchParams();
        params.set('authors', data.author);
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
          {authorName}
        </button>
      </div>
    );
  }

  return null;
};
