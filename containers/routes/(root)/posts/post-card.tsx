import { Post } from '@/types/post';
import { Card, CardContent, CardFooter, CardHeader } from '@/uis/card';
import Link from 'next/link';
import { ArrowUpLeft } from 'lucide-react';

interface PostCardProps {
  post: Post;
  number: number;
}

export const PostCard = (props: PostCardProps) => {
  return (
    <Card className="grid group relative grid-rows-[auto_auto_1fr_auto] rounded-2xl overflow-hidden">
      <CardHeader className="flex p-2.5 justify-between gap-3 border-b">
        <div className="flex justify-between w-full items-center gap-3">
          <h2 className="font-bold">
            <Link href={`/${props.post.slug}`}>{props.post.title}</Link>
          </h2>
          <div className="border size-7.5 flex items-center justify-center rounded-sm text-smp pt-1">
            {props.number + 1}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground px-2.5 py-3 text-justify text-smp">
          {props.post.summary}
        </p>
      </CardContent>
      <CardFooter className="border-t flex items-start justify-between p-2.5">
        <Link
          href={`/${props.post.slug}`}
          className="border group/link h-fit whitespace-nowrap flex gap-1 items-center bg-card text-card-foreground group hover:bg-accent hover:text-accent-foreground z-10 relative px-2.5 p-1.5 rounded-md"
        >
          <p className="text-sm text-foreground">مشاهده بیشتر</p>
          <ArrowUpLeft className="size-4 text-foreground transition-transform duration-300 group-hover/link:-rotate-45" />
        </Link>
      </CardFooter>
    </Card>
  );
};
