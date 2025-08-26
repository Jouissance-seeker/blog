import { getEssays } from '@/services/essays/get-essays';
import { ResultEmpty } from '@/containers/routes/global/result-empty';
import { EssayList } from '@/containers/routes/dashboard/essays/essay-list';

export const dynamic = 'force-static';

export default async function DashboardEssaysPage() {
  const fetchEssays = await getEssays();

  return (
    <div className="my-5">
      {fetchEssays.length === 0 ? (
        <ResultEmpty text="جستاری ای یافت نشد ..." />
      ) : (
        <EssayList initialEssays={fetchEssays} />
      )}
    </div>
  );
}
