import { Post } from "@/types/post";
import { getPosts } from "@/services/get-posts";
import { Alert, AlertTitle, AlertDescription } from "@/uis/alert";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

interface AlertConceptProps {
  postData: Post;
}

export const AlertConcept = async (props: AlertConceptProps) => {
  const conceptPosts = await getPosts({ type: "concept" });
  const keywordMatches = props.postData.content.match(/\*\*(.*?)\*\*/g);
  const keywords = keywordMatches
    ? keywordMatches.map((match) => match.replace(/\*\*/g, "").trim())
    : [];
  const matchedConcepts = conceptPosts.filter(
    (concept) =>
      concept.slug !== props.postData.slug &&
      keywords.some((keyword) => {
        const persianTitle = concept.title.replace(/\s*\([^)]*\)$/, "").trim();
        const isMatch = persianTitle === keyword;
        return isMatch;
      })
  );

  if (matchedConcepts.length === 0) {
    return;
  }

  return (
    <Alert>
      <Lightbulb className="!size-5" />
      <AlertTitle>یک نکته!</AlertTitle>
      <AlertDescription className="flex flex-col mt-2 gap-4">
        <span>
          در این پست از مفاهیمی استفاده شده که پیش تر در قالب پست هایی مجزا به
          بعضی از آنها پرداخته شده , با این حال مطالعه آنها پیشنیاز این پست
          نیست.
          <br />
          با کلیک بر روی عنوان هر مفهوم به صفحه مربوط به آن منتقل خواهید شد.
        </span>
        <div className="flex flex-col gap-4">
          {matchedConcepts.map((post) => (
            <span key={post._id?.toString()} className="flex flex-col gap-2">
              <Link href={`/${post.slug}`} className="font-medium !no-underline">
                {post.title}
              </Link>
              <span>{post.summary}</span>
            </span>
          ))}
        </div>
      </AlertDescription>
    </Alert>
  );
};
