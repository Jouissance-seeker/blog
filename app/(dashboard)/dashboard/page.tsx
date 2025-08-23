import { getPosts } from "@/services/get-posts";
import { Tab } from "@/types/tab";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/uis/table";
import { ModalEditPost } from "@/containers/routes/dashboard/modal-edit-post";
import Link from "next/link";
import { ModalDeletePost } from "@/containers/routes/dashboard/modal-delete-post";

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const tab = searchParams.tab ?? "all";
  const postsData = await getPosts({ type: tab as Tab });

  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>عنوان</TableHead>
            <TableHead>نوع</TableHead>
            <TableHead>عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {postsData.map((post) => (
            <TableRow key={post._id?.toString()}>
              <TableCell>
                <Link href={`/${post.slug}`}>{post.title}</Link>
              </TableCell>
              <TableCell>{post.type === "concept" ? "مفهوم" : "جستار"}</TableCell>
              <TableCell>
                <ModalEditPost post={post} />
                <ModalDeletePost id={String(post._id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
