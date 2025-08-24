import { getPosts } from "@/services/get-posts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/uis/table";
import { ModalPost } from "@/containers/routes/(dashboard)/dashboard/modal-post";
import Link from "next/link";
import { ModalDeletePost } from "@/containers/routes/(dashboard)/dashboard/modal-delete-post";
import { Filters } from "@/containers/routes/global/filters";

interface PageProps {
  searchParams: {
    title?: string;
    author?: string;
    type?: string;
  };
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const queryTitle = (searchParams?.title as string) ?? "";
  const queryAuthor = (searchParams?.author as string) ?? "";
  const queryType = (searchParams?.type as string) ?? "";

  const fetchPosts = await getPosts({
    title: queryTitle,
    author: queryAuthor,
    type: queryType,
  });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[250px_1fr] gap-5 my-5">
      <Filters />
      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عنوان</TableHead>
              <TableHead>تگ ها</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetchPosts.map((post) => (
              <TableRow key={post._id?.toString()}>
                <TableCell>
                  <Link href={`/${post.slug}`}>{post.title}</Link>
                </TableCell>
                <TableCell>{post.tags?.join(", ")}</TableCell>
                <TableCell>
                  <ModalPost post={post} mode="edit" />
                  <ModalDeletePost id={String(post._id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
