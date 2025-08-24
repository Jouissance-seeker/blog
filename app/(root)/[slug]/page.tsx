import { getPost } from '@/services/get-post';
import { getPosts } from '@/services/get-posts';
import { marked } from 'marked';
import { AnimatedMarkdown } from '@/containers/routes/(root)/post/animated-markdown';
import { AnimatedSection } from '@/containers/routes/(root)/posts/animated-section';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const fetchPosts = await getPosts({
    title: '',
    author: '',
    type: '',
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
