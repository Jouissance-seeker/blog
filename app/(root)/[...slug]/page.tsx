import { marked } from 'marked';
import { AnimatedMarkdown } from '@/containers/routes/(root)/post/animated-markdown';
import { AnimatedSection } from '@/containers/routes/(root)/posts/animated-section';
import { notFound } from 'next/navigation';
import { getPost } from '@/services/get-post';
import { Tags } from '@/containers/routes/(root)/global/tags';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  if (params.slug.length !== 3) {
    notFound();
  }

  const fetchPost = await getPost({
    authors: params.slug[0] ?? '',
    category: params.slug[1] ?? '',
    slug: params.slug[2] ?? '',
  });

  if (!fetchPost) {
    notFound();
  }
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between gap-2 w-full items-center px-2.5 py-3 rounded-xl border sticky top-[100px] bg-background z-20">
        <h1 className="text-xl font-bold">{fetchPost.title}</h1>
        <Tags data={fetchPost} />
      </div>
      <div className="prose dark:prose-invert max-w-full w-full text-justify mt-7.5 mb-16 bg-background border rounded-xl p-3">
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
