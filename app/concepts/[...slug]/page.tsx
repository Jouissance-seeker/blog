import { getConcepts } from '@/services/concepts/get-concepts';
import { getConcept } from '@/services/concepts/get-concept';
import { notFound } from 'next/navigation';
import { AnimatedSection } from '@/containers/routes/global/animated-section';
import { AnimatedMarkdown } from '@/containers/routes/global/animated-markdown';
import {
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from '@/uis/breadcrumb';
import Link from 'next/link';
import { authorsToFa } from '@/constants/authors';

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

export default async function ConceptPage(props: PageProps) {
  const { slug } = await props.params;
  const fetchConcept = await getConcept(slug[0]);

  if (!fetchConcept) {
    notFound();
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="pointer-events-none">
                خانه
              </Link>
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
            <BreadcrumbLink asChild>
              <Link
                href={{
                  pathname: '/concepts',
                  query: {
                    'filter-concept-authors':
                      fetchConcept.slug.match(/^[^-]+-[^-]+/)?.[0],
                  },
                }}
              >
                {
                  authorsToFa[
                    fetchConcept.slug.match(
                      /^[^-]+-[^-]+/,
                    )?.[0] as keyof typeof authorsToFa
                  ]
                }
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{fetchConcept.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="prose dark:prose-invert max-w-full w-full text-justify bg-background border rounded-xl px-3">
        <AnimatedSection>
          <h2 className="pt-4">چکیده</h2>
          <p>{fetchConcept.summary}</p>
        </AnimatedSection>
        <AnimatedMarkdown content={fetchConcept.content} />
      </div>
    </>
  );
}
