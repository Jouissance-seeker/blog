import { getPosts } from "@/services/get-posts";
import { PostCard } from "@/containers/routes/posts/post-card";
import { Tab } from "@/types/tab";
import { AnimatedSection } from "@/containers/routes/posts/animated-section";

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const tab = (searchParams.tab as Tab) ?? "all";
  const fetchPosts = await getPosts({ type: tab });

  return (
    <section className="py-5 flex items-center flex-col gap-6">
      <div className="flex flex-col gap-4">
        {fetchPosts.map((post) => (
          <AnimatedSection key={post._id?.toString()}>
            <PostCard post={post} />
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
