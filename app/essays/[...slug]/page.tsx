import { getEssays } from '@/services/essay/get-essays';
import { getEssay } from '@/services/essay/get-essay';
import { notFound } from 'next/navigation';
import { AnimatedSection } from '@/containers/routes/global/animated-section';
import { Tag } from '@/containers/routes/global/tag';
import { AnimatedMarkdown } from '@/containers/routes/global/animated-markdown';
import { marked } from 'marked';

export async function generateStaticParams() {
  const essays = await getEssays();
  return essays.map((essay) => ({
    slug: [
      Array.isArray(essay.authors)
        ? essay.authors.join('-')
        : String(essay.authors || ''),
      String(essay.slug || ''),
    ],
  }));
}

interface PageProps {
  params: { slug: string[] };
}

export default async function EssayPage({ params }: PageProps) {
  const fetchEssay = await getEssay(params.slug);

  if (!fetchEssay) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between gap-2 w-full items-center px-2.5 py-3 rounded-xl border sticky top-[97px] bg-background z-20">
        <h1 className="text-xl font-bold">{fetchEssay.title}</h1>
        <Tag data={fetchEssay} />
      </div>
      <div className="prose dark:prose-invert max-w-full w-full text-justify my-7.5 bg-background border rounded-xl px-3">
        {fetchEssay.quote && (
          <AnimatedSection>
            <blockquote>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(fetchEssay.quote),
                }}
              />
            </blockquote>
          </AnimatedSection>
        )}
        <AnimatedSection>
          <h3>چکیده</h3>
          <p>{fetchEssay.summary}</p>
        </AnimatedSection>
        <AnimatedMarkdown content={fetchEssay.content} />
      </div>
    </div>
  );
}
