import { getPosts } from "@/services/get-posts";
import { PostCard } from "@/containers/routes/posts/post-card";
import { AnimatedSection } from "@/containers/routes/posts/animated-section";

export default async function Page() {
  const fetchPosts = await getPosts();

  return (
    <section className="py-5 flex items-center flex-col gap-6">
      <div className="flex flex-col gap-4">
        {fetchPosts.map((post, index) => (
          <AnimatedSection key={post._id?.toString()}>
            <PostCard post={post} index={fetchPosts.length - index - 1} />
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
