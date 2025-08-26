import { getEssays } from '@/services/essays/get-essays';
import { getEssay } from '@/services/essays/get-essay';
import { notFound } from 'next/navigation';
import { AnimatedSection } from '@/containers/routes/global/animated-section';
import { AnimatedMarkdown } from '@/containers/routes/global/animated-markdown';
import { marked } from 'marked';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const fetchEssays = await getEssays();
  return fetchEssays.map((essay) => ({
    slug: [
      Array.isArray(essay.authors)
        ? essay.authors.join('-')
        : String(essay.authors || ''),
      String(essay.slug || ''),
    ],
  }));
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function EssayPage({ params }: PageProps) {
  const { slug } = await params;
  const fetchEssay = await getEssay(slug);

  if (!fetchEssay) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between gap-2 w-fit items-center px-2.5 py-3 rounded-xl border sticky top-[97px] bg-background z-20">
        <h1 className="text-lg font-bold">{fetchEssay.title}</h1>
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
