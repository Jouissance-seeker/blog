import { getPosts } from '@/services/posts/get-posts';
import { Filters } from '@/containers/routes/global/filters';
import { PostList } from '@/containers/routes/posts/post-list';

export const dynamic = 'force-static';

export default async function Page() {
  const fetchPosts = await getPosts();

  return (
    <div className="py-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4">
      <Filters />
      <PostList initialPosts={fetchPosts} />
    </div>
  );
}
