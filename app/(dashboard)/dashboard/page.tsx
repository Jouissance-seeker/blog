import { getPosts } from "@/services/get-posts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/uis/table";
import { ModalPost } from "@/containers/routes/dashboard/modal-post";
import Link from "next/link";
import { ModalDeletePost } from "@/containers/routes/dashboard/modal-delete-post";

export default async function Page() {
  const postsData = await getPosts();

  return (
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
          {postsData.map((post) => (
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
  );
}
