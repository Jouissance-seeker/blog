import { getPost } from "@/services/get-post";
import { getPosts } from "@/services/get-posts";
import { AlertConcept } from "@/containers/routes/post/alert-concept";
import { marked } from "marked";
import { AnimatedMarkdown } from "@/containers/routes/post/animated-markdown";
import Link from "next/link";
import { AnimatedSection } from "@/containers/routes/posts/animated-section";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getPosts({ type: "all" });
  return posts.map((post) => ({
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
  const postData = await getPost({ slug: params.slug });

  return (
    <section className="flex flex-col items-center">
      <div className="prose dark:prose-invert max-w-full w-full text-justify">
        <AnimatedSection>
          <div className="flex items-center gap-3 my-4">
            <Link
              href={`/?${postData.type === "concept" ? "concept" : "essay"}`}
              className="border bg-card text-card-foreground transition-all duration-300 hover:bg-accent !no-underline hover:text-accent-foreground z-10 py-1 px-4 rounded-md"
            >
              {postData.type === "concept" ? "مفهوم" : "جستار"}
            </Link>
            <h1 className="!my-0 text-xl font-bold">{postData.title}</h1>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <AlertConcept postData={postData} />
        </AnimatedSection>
        <AnimatedSection>
          <blockquote>
            <div
              dangerouslySetInnerHTML={{
                __html: marked(postData.quote),
              }}
            />
          </blockquote>
        </AnimatedSection>
        <AnimatedSection>
          <h3>چکیده</h3>
          <p>{postData.summary}</p>
        </AnimatedSection>

        <AnimatedMarkdown content={postData.content} />
      </div>
    </section>
  );
}
