import { getPosts } from "@/services/get-posts";
import { PostCard } from "@/containers/routes/(root)/posts/post-card";
import { AnimatedSection } from "@/containers/routes/(root)/posts/animated-section";
import { Filters } from "@/containers/routes/global/filters";

interface PageProps {
  searchParams: {
    title?: string;
    author?: string;
    type?: string;
  };
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const queryTitle = (searchParams?.title as string) ?? "";
  const queryAuthor = (searchParams?.author as string) ?? "";
  const queryType = (searchParams?.type as string) ?? "";

  const fetchPosts = await getPosts({
    title: queryTitle,
    author: queryAuthor,
    type: queryType,
  });

  return (
    <div className="py-5 grid grid-cols-1 sm:grid-cols-[250px_1fr] gap-4">
      <Filters />
      <section className="flex flex-col gap-4">
        {fetchPosts.map((post, index) => (
          <AnimatedSection key={post._id?.toString()}>
            <PostCard post={post} number={fetchPosts.length - index - 1} />
          </AnimatedSection>
        ))}
      </section>
    </div>
  );
}
