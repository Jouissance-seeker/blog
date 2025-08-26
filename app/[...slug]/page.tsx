import { marked } from 'marked';
import { notFound } from 'next/navigation';
import { Tag } from '@/containers/routes/global/tag';
import { getPosts } from '@/services/posts/get-posts';
import { getPost } from '@/services/posts/get-post';
import { AnimatedSection } from '@/containers/routes/global/animated-section';
import { AnimatedMarkdown } from '@/containers/routes/global/animated-markdown';

export const dynamic = 'force-static';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: [post.authors.join('-'), post.category, post.slug],
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const fetchPost = await getPost({
    authors: slug[0],
    category: slug[1],
    slug: slug[2],
  });

  if (!fetchPost) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between gap-2 w-full items-center px-2.5 py-3 rounded-xl border sticky top-[97px] bg-background z-20">
        <h1 className="text-xl font-bold">{fetchPost.title}</h1>
        <Tag data={fetchPost} />
      </div>
      <div className="prose dark:prose-invert max-w-full w-full text-justify my-7.5 bg-background border rounded-xl px-3">
        {fetchPost.quote && (
          <AnimatedSection>
            <blockquote>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(fetchPost.quote),
                }}
              />
            </blockquote>
          </AnimatedSection>
        )}
        <AnimatedSection>
          <h3>چکیده</h3>
          <p>{fetchPost.summary}</p>
        </AnimatedSection>
        <AnimatedMarkdown content={fetchPost.content} />
      </div>
    </div>
  );
}
