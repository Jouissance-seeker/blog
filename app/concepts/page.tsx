import { ConceptList } from '@/containers/routes/concepts/concept-list';
import { AnimatedSection } from '@/containers/global/animated-section';
import { getConcepts } from '@/services/concepts/get-concepts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbList,
} from '@/uis/breadcrumb';
import Link from 'next/link';

export const dynamic = 'force-static';

export default async function ConceptsPage() {
  const fetchConcepts = await getConcepts();

  return (
    <>
      <AnimatedSection>
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
              <BreadcrumbPage>مفاهیم</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </AnimatedSection>
      <ConceptList initialConcepts={fetchConcepts} />
    </>
  );
}
