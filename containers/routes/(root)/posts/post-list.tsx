'use client';

import { useQueryState } from 'nuqs';
import { PostCard } from './post-card';
import { AnimatedSection } from './animated-section';
import { ResultEmpty } from '@/containers/routes/global/result-empty';
import { Post } from '@/types/post';

interface PostListProps {
  initialPosts: Post[];
}

export const PostList = ({ initialPosts }: PostListProps) => {
  const [title] = useQueryState('title', { defaultValue: '' });
  const [authors] = useQueryState('authors', { defaultValue: '' });
  const [category] = useQueryState('category', { defaultValue: '' });
  let filteredPosts = initialPosts.filter((post) => post.isActive == 'yes');
  if (title.trim()) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title?.toLowerCase().includes(title.toLowerCase()) ||
        post.summary?.toLowerCase().includes(title.toLowerCase()),
    );
  }
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
    filteredPosts = filteredPosts.filter((post) =>
      post.category?.toLowerCase().includes(category.toLowerCase()),
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {filteredPosts.length === 0 ? (
        <ResultEmpty />
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
