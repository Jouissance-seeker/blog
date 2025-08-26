import { Inbox } from 'lucide-react';

interface ResultEmptyProps {
  title: string;
}

export const ResultEmpty = (props: ResultEmptyProps) => {
  return (
    <div className="items-center justify-center bg-background h-fit flex flex-col gap-3 border rounded-xl p-7">
      <Inbox className="size-18 text-muted-foreground stroke-1" />
      <p className="text-muted-foreground font-medium">{props.title}</p>
    </div>
  );
};
