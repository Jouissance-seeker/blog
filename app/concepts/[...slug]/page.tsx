import { getConcepts } from '@/services/concept/get-concepts';
import { getConcept } from '@/services/concept/get-concept';
import { notFound } from 'next/navigation';
import { AnimatedSection } from '@/containers/routes/global/animated-section';
import { Tag } from '@/containers/routes/global/tag';
import { AnimatedMarkdown } from '@/containers/routes/global/animated-markdown';
import { marked } from 'marked';

export async function generateStaticParams() {
  const concepts = await getConcepts();
  return concepts.map((concept) => ({
    slug: [
      Array.isArray(concept.authors)
        ? concept.authors.join('-')
        : String(concept.authors || ''),
      String(concept.slug || ''),
    ],
  }));
}

interface PageProps {
  params: { slug: string[] };
}

export default async function EssayPage({ params }: PageProps) {
  const fetchConcept = await getConcept(params.slug);

  if (!fetchConcept) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between gap-2 w-full items-center px-2.5 py-3 rounded-xl border sticky top-[97px] bg-background z-20">
        <h1 className="text-xl font-bold">{fetchConcept.title}</h1>
        <Tag data={fetchConcept} />
      </div>
      <div className="prose dark:prose-invert max-w-full w-full text-justify my-7.5 bg-background border rounded-xl px-3">
        {fetchConcept.quote && (
          <AnimatedSection>
            <blockquote>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(fetchConcept.quote),
                }}
              />
            </blockquote>
          </AnimatedSection>
        )}
        <AnimatedSection>
          <h3>چکیده</h3>
          <p>{fetchConcept.summary}</p>
        </AnimatedSection>
        <AnimatedMarkdown content={fetchConcept.content} />
      </div>
    </div>
  );
}
