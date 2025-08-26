import { getEssays } from '@/services/essays/get-essays';
import { getConcepts } from '@/services/concepts/get-concepts';
import { EssayList } from '@/containers/routes/essays/essay-list';
import { ConceptList } from '@/containers/routes/concepts/concept-list';

export const dynamic = 'force-static';

export default async function Page() {
  const essays = await getEssays();
  const concepts = await getConcepts();

  return (
    <div className="space-y-4">
      <section>
        <h2 className="text-2xl font-bold mb-4">جستارها</h2>
        <EssayList initialEssays={essays} />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">مفاهیم</h2>
        <ConceptList initialConcepts={concepts} />
      </section>
    </div>
  );
}
