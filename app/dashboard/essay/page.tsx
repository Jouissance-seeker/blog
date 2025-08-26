import { getEssays } from '@/services/essay/get-essays';
import { Filters } from '@/containers/routes/global/filters';
import { ResultEmpty } from '@/containers/routes/global/result-empty';
import { EssayList } from '@/containers/routes/dashboard/essays/essay-list';

export default async function DashboardEssaysPage() {
  const essays = await getEssays();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[250px_1fr] gap-5 my-5">
      <Filters />
      {essays.length === 0 ? (
        <ResultEmpty text="جستاری ای یافت نشد ..." />
      ) : (
        <EssayList initialEssays={essays} />
      )}
    </div>
  );
}
