import { ConceptList } from '@/containers/routes/dashboard/concepts/concept-list';
import { ResultEmpty } from '@/containers/routes/global/result-empty';
import { getConcepts } from '@/services/concepts/get-concepts';

export const dynamic = 'force-static';

export default async function DashboardConceptsPage() {
  const fetchConcepts = await getConcepts();

  return (
    <div className="my-5">
      {fetchConcepts.length === 0 ? (
        <ResultEmpty text="مفهومی یافت نشد ..." />
      ) : (
        <ConceptList initialConcepts={fetchConcepts} />
      )}
    </div>
  );
}
