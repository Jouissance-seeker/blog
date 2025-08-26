import { getPosts } from '@/services/posts/get-posts';

import { Filters } from '@/containers/routes/global/filters';
import { PostList } from '@/containers/routes/dashboard/posts/post-list';

export const dynamic = 'force-static';

export default async function Page() {
  const fetchPosts = await getPosts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[250px_1fr] gap-5 my-5">
      <Filters />
      <PostList initialPosts={fetchPosts} />
    </div>
  );
}
