import { getPosts } from "@/services/get-posts";
import { PostCard } from "@/containers/routes/posts/post-card";
import { AnimatedSection } from "@/containers/routes/posts/animated-section";
import { Filters } from "@/containers/routes/posts/filters";

export default async function Page() {
  const fetchPosts = await getPosts();

  return (
    <div className="py-5 grid grid-cols-1 sm:grid-cols-[250px_1fr] gap-4">
      <Filters />
      <section className="flex flex-col gap-4">
        {fetchPosts.map((post, index) => (
          <AnimatedSection key={post._id?.toString()}>
            <PostCard post={post} index={fetchPosts.length - index - 1} />
          </AnimatedSection>
        ))}
      </section>
    </div>
  );
}
