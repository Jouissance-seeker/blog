import { ConceptList } from '@/containers/routes/concepts/concept-list';
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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">خانه</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>مفاهیم</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ConceptList initialConcepts={fetchConcepts} />
    </>
  );
}
