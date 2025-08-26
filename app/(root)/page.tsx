import { getPosts } from '@/services/get-posts';
import { PostCard } from '@/containers/routes/(root)/posts/post-card';
import { AnimatedSection } from '@/containers/routes/(root)/posts/animated-section';
import { Filters } from '@/containers/routes/global/filters';
import { ResultEmpty } from '@/containers/routes/global/result-empty';

export const dynamic = 'force-static';

export default async function Page() {
  const fetchPosts = await getPosts();

  return (
    <div className="py-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4">
      <Filters />
      <section className="flex flex-col gap-4">
        {fetchPosts.length === 0 ? (
          <ResultEmpty />
        ) : (
          fetchPosts.map((post, index) => (
            <AnimatedSection key={post._id?.toString()}>
              <PostCard post={post} number={fetchPosts.length - index - 1} />
            </AnimatedSection>
          ))
        )}
      </section>
    </div>
  );
}
