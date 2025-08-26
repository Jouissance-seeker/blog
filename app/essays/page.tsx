import { getEssays } from '@/services/essays/get-essays';
import { EssayList } from '@/containers/routes/essays/essay-list';
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

export default async function EssaysPage() {
  const essays = await getEssays();

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
            <BreadcrumbPage>جستار ها</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <EssayList initialEssays={essays} />
    </>
  );
}
