import { getEssays } from '@/services/essays/get-essays';
import { getEssay } from '@/services/essays/get-essay';
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
  const fetchEssays = await getEssays();
  return fetchEssays.map((essay) => ({
    slug: [essay.slug],
  }));
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function EssayPage(props: PageProps) {
  const { slug } = await props.params;
  const fetchEssay = await getEssay(slug[0]);

  if (!fetchEssay) {
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
              <Link href="/essays">جستار ها</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{fetchEssay.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="prose dark:prose-invert max-w-full w-full text-justify bg-background border rounded-xl px-3">
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
          <h2>چکیده</h2>
          <p>{fetchEssay.summary}</p>
        </AnimatedSection>
        <AnimatedMarkdown content={fetchEssay.content} />
      </div>
    </>
  );
}
