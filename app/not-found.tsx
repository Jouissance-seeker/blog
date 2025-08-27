import { FileX } from 'lucide-react';

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-130px)] gap-6">
      <div className="flex bg-background text-foreground rounded-xl p-10 border flex-col gap-6 items-center">
        <FileX className="size-12" />
        <p>صفحه مورد نظر یافت نشد ...</p>
      </div>
    </div>
  );
}
