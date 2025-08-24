import { getPost } from "@/services/get-post";
import { getPosts } from "@/services/get-posts";
import { marked } from "marked";
import { AnimatedMarkdown } from "@/containers/routes/(root)/post/animated-markdown";
import { AnimatedSection } from "@/containers/routes/(root)/posts/animated-section";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const fetchPosts = await getPosts({
    title: "",
    author: "",
    type: "",
  });
  return fetchPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const fetchPost = await getPost({ slug: params.slug });

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full items-center py-4 border-b sticky top-[85px] bg-background z-20">
        <h1 className="text-xl font-bold">{fetchPost.title}</h1>
        <div className="hidden md:block">
          {fetchPost.tags?.map((tag) => (
            <div className="border text-sm bg-card text-card-foreground transition-all duration-300 py-2 px-4 rounded-md">
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="prose dark:prose-invert max-w-full w-full text-justify mb-16">
        <AnimatedSection>
          <blockquote>
            <div
              dangerouslySetInnerHTML={{
                __html: marked(fetchPost.quote),
              }}
            />
          </blockquote>
        </AnimatedSection>
        <AnimatedSection>
          <h3>چکیده</h3>
          <p>{fetchPost.summary}</p>
        </AnimatedSection>
        <AnimatedMarkdown content={fetchPost.content} />
      </div>
    </div>
  );
}
