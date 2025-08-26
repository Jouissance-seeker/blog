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
import { authors } from '@/constants/authors';
import { category } from '@/constants/category';
import { cn } from '@/utils/cn';

export default async function Page() {
  const fetchPosts = await getPosts();

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
              <TableHead>نمایش</TableHead>
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
                <TableCell>
                  {post.authors
                    ?.map((author) => {
                      const authorData = authors.find((a) => a.en === author);
                      return authorData ? authorData.fa : author;
                    })
                    .join(' - ')}
                </TableCell>
                <TableCell>
                  {(() => {
                    const cat = category.find((c) => c.en === post.category);
                    return cat ? cat.fa : post.category;
                  })()}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'px-2 py-1 rounded text-xs',
                      post.isActive === 'yes'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800',
                    )}
                  >
                    {post.isActive === 'yes' ? 'بله' : 'خیر'}
                  </span>
                </TableCell>
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
