import { ConceptList } from '@/containers/routes/concepts/concept-list';
import { getConcepts } from '@/services/concepts/get-concepts';

export const dynamic = 'force-static';

export default async function ConceptsPage() {
  const fetchConcepts = await getConcepts();

  return (
    <div className="py-4">
      <ConceptList initialConcepts={fetchConcepts} />
    </div>
  );
}
