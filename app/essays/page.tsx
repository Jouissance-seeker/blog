import { getEssays } from '@/services/essay/get-essays';
import { Filters } from '@/containers/routes/global/filters';
import { EssayList } from '@/containers/routes/essay/essay-list';

export const dynamic = 'force-static';

export default async function EssaysPage() {
  const essays = await getEssays();

  return (
    <div className="py-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4">
      <Filters />
      <EssayList initialEssays={essays} />
    </div>
  );
}
