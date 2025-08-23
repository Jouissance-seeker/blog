import { Post } from "@/types/post";
import { Card, CardContent, CardFooter, CardHeader } from "@/uis/card";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export const PostCard = (props: PostCardProps) => {
  return (
    <Card className="grid group relative grid-rows-[auto_auto_1fr_auto] gap-1 rounded-2xl overflow-hidden">
      <CardHeader className="flex justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold">
            <Link href={`/${props.post.slug}`}>{props.post.title}</Link>
          </h2>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mt-3 text-justify text-smp">
          {props.post.summary}
        </p>
      </CardContent>
      <CardFooter className="border-t flex justify-between">
        <div className="flex gap-2 flex-wrap">
          <Link
            href={`/`}
            className="border bg-card font-medium text-sm text-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground !no-underline z-10 px-2.5 py-1.5  rounded-md"
          >
            لکان / مکانیزم دفاعی
          </Link>
          <Link
            href={`/`}
            className="border bg-card font-medium text-sm text-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground !no-underline z-10 px-2.5 py-1.5  rounded-md"
          >
            لکان / مفهوم
          </Link>
        </div>
        <Link
          href={`/${props.post.slug}`}
          className="border hidden sm:flex gap-1 items-center bg-card text-card-foreground group transition-all duration-300 hover:bg-accent hover:text-accent-foreground z-10 relative px-2.5 p-1.5 rounded-md"
        >
          <p className="font-medium text-sm text-foreground transition-all duration-300">
            مشاهده بیشتر
          </p>
          <ArrowUpLeft className="size-4 text-foreground transition-all duration-300" />
        </Link>
      </CardFooter>
    </Card>
  );
};
