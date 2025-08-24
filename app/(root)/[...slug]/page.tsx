import { getPosts } from '@/services/get-posts';
import { marked } from 'marked';
import { AnimatedMarkdown } from '@/containers/routes/(root)/post/animated-markdown';
import { AnimatedSection } from '@/containers/routes/(root)/posts/animated-section';
import { generateCardLink } from '@/utils/generate-card-link';
import { notFound } from 'next/navigation';
import { getPost } from '@/services/get-post';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const fetchPosts = await getPosts({
    title: '',
    authors: [],
    category: '',
  });

  return fetchPosts.map((post) => {
    const urlParts = generateCardLink(post).split('/').filter(Boolean);
    return {
      slug: urlParts,
    };
  });
}

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
      <div className="prose dark:prose-invert max-w-full w-full text-justify mb-16">
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
