import { getEssays } from '@/services/essays/get-essays';
import { EssayList } from '@/containers/routes/essays/essay-list';

export const dynamic = 'force-static';

export default async function EssaysPage() {
  const essays = await getEssays();

  return (
    <div className="py-4">
      <EssayList initialEssays={essays} />
    </div>
  );
}
