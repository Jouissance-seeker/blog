import { ConceptList } from '@/containers/routes/concepts/concept-list';
import { Filters } from '@/containers/routes/global/filters';
import { getConcepts } from '@/services/concepts/get-concepts';

export const dynamic = 'force-static';

export default async function ConceptsPage() {
  const fetchConcepts = await getConcepts();

  return (
    <div className="py-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4">
      <Filters />
      <ConceptList initialConcepts={fetchConcepts} />
    </div>
  );
}
