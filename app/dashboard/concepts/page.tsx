import { ConceptList } from '@/containers/routes/dashboard/concepts/concept-list';
import { Filters } from '@/containers/routes/global/filters';
import { ResultEmpty } from '@/containers/routes/global/result-empty';
import { getConcepts } from '@/services/concepts/get-concepts';

export const dynamic = 'force-static';

export default async function DashboardConceptsPage() {
  const fetchConcepts = await getConcepts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[250px_1fr] gap-5 my-5">
      <Filters />
      {fetchConcepts.length === 0 ? (
        <ResultEmpty text="مفهومی یافت نشد ..." />
      ) : (
        <ConceptList initialConcepts={fetchConcepts} />
      )}
    </div>
  );
}
