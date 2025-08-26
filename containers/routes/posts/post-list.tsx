'use client';

import { useQueryState } from 'nuqs';
import { PostCard } from './post-card';
import { Post } from '@/types/post';
import { AnimatedSection } from '../global/animated-section';
import { ResultEmpty } from '../global/result-empty';

interface PostListProps {
  initialPosts: Post[];
}

export const PostList = ({ initialPosts }: PostListProps) => {
  const [authors] = useQueryState('authors', { defaultValue: '' });
  const [category] = useQueryState('category', { defaultValue: '' });
  let filteredPosts = initialPosts
    .filter((post) => post.isActive == 'yes')
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime(),
    );
  if (authors.trim()) {
    const authorList = authors
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);
    if (authorList.length > 0) {
      filteredPosts = filteredPosts.filter((post) =>
        post.authors?.some((author) => authorList.includes(author)),
      );
    }
  }
  if (category.trim()) {
    const categoryList = category
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    if (categoryList.length > 0) {
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.category &&
          categoryList.some((cat) =>
            post.category?.toLowerCase().includes(cat.toLowerCase()),
          ),
      );
    }
  }

  return (
    <section className="flex flex-col gap-4">
      {filteredPosts.length === 0 ? (
        <ResultEmpty text="مقاله ای یافت نشد ..." />
      ) : (
        filteredPosts.map((post, index) => (
          <AnimatedSection key={post._id?.toString()}>
            <PostCard post={post} number={filteredPosts.length - index - 1} />
          </AnimatedSection>
        ))
      )}
    </section>
  );
};
