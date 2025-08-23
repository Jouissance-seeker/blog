import { Post } from "@/types/post";
import { Card, CardContent, CardHeader } from "@/uis/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpLeft } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export const PostCard = (props: PostCardProps) => {
  return (
    <Card className="grid group relative grid-rows-[auto_auto_1fr_auto] gap-1 rounded-2xl overflow-hidden">
      <CardHeader className="flex justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href={`/?tab=${
              props.post.type === "concept" ? "concept" : "essay"
            }`}
            className="border bg-card text-card-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground !no-underline z-10 py-1 px-3 rounded-md"
          >
            {props.post.type === "concept" ? "مفهوم" : "جستار"}
          </Link>
          <h2 className="text-lg font-bold">
            <Link href={`/${props.post.slug}`}>{props.post.title}</Link>
          </h2>
        </div>
        <Link
          href={`/${props.post.slug}`}
          className="border hidden opacity-0 group/link invisible group-hover:opacity-100 group-hover:visible lg:flex gap-1 items-center bg-card text-card-foreground group transition-all duration-300 hover:bg-accent hover:text-accent-foreground z-10 relative p-2 rounded-md"
        >
          <p className="font-medium text-sm text-foreground transition-all duration-300">
            مشاهده بیشتر
          </p>
          <ArrowUpLeft className="size-4 text-foreground group-hover/link:rotate-[-45deg] transition-all duration-300" />
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mt-3 text-justify text-smp">
          {props.post.summary}
        </p>
      </CardContent>
    </Card>
  );
};
