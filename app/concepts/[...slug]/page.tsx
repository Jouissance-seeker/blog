import { getConcepts } from '@/services/concepts/get-concepts';
import { getConcept } from '@/services/concepts/get-concept';
import { notFound } from 'next/navigation';
import { AnimatedSection } from '@/containers/routes/global/animated-section';
import { AnimatedMarkdown } from '@/containers/routes/global/animated-markdown';
import { marked } from 'marked';
import {
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from '@/uis/breadcrumb';
import Link from 'next/link';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const fetchConcepts = await getConcepts();
  return fetchConcepts.map((concept) => ({
    slug: [concept.slug],
  }));
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function EssayPage({ params }: PageProps) {
  const { slug } = await params;
  const fetchConcept = await getConcept(slug);

  if (!fetchConcept) {
    notFound();
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">خانه</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/concepts">مفاهیم</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{fetchConcept.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="prose dark:prose-invert max-w-full w-full text-justify bg-background border rounded-xl px-3">
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
          <h2>چکیده</h2>
          <p>{fetchConcept.summary}</p>
        </AnimatedSection>
        <AnimatedMarkdown content={fetchConcept.content} />
      </div>
    </>
  );
}
