import { getPosts } from '@/services/get-posts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/uis/table';
import { ModalPost } from '@/containers/routes/(dashboard)/dashboard/modal-post';
import Link from 'next/link';
import { ModalDeletePost } from '@/containers/routes/(dashboard)/dashboard/modal-delete-post';
import { Filters } from '@/containers/routes/global/filters';
import { ResultEmpty } from '@/containers/routes/global/result-empty';

interface PageProps {
  searchParams: Promise<{
    title?: string;
    authors?: string;
    category?: string;
    slug?: string;
  }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const queryTitle = searchParams?.title ?? '';
  const queryAuthors = searchParams?.authors ?? '';
  const queryCategory = searchParams?.category ?? '';
  const querySlug = searchParams?.slug ?? '';

  const fetchPosts = await getPosts({
    title: queryTitle,
    authors: queryAuthors ? queryAuthors.split(',').map((s) => s.trim()) : [],
    category: queryCategory,
    slug: querySlug,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[250px_1fr] gap-5 my-5">
      <Filters />
      {fetchPosts.length === 0 ? (
        <ResultEmpty />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عنوان</TableHead>
              <TableHead>اسلاگ</TableHead>
              <TableHead>اندیشمندان</TableHead>
              <TableHead>دسته بندی</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetchPosts.map((post) => (
              <TableRow key={post._id?.toString()}>
                <TableCell>
                  <Link
                    href={`/${post.authors.join('-')}/${post.category}/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell>{post.slug}</TableCell>
                <TableCell>{post.authors?.join(' - ')}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  <ModalPost post={post} mode="edit" />
                  <ModalDeletePost id={String(post._id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
