'use client';

import { useQueryState } from 'nuqs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/uis/table';
import Link from 'next/link';
import { ModalPost } from './modal-post';
import { authors } from '@/constants/authors';
import { category } from '@/constants/category';
import { cn } from '@/utils/cn';
import { ResultEmpty } from '@/containers/routes/global/result-empty';
import { Post } from '@/types/post';
import { ModalDelete } from '../global/modal-delete';

interface PostListProps {
  initialPosts: Post[];
}

export const PostList = ({ initialPosts }: PostListProps) => {
  const [authorsQuery] = useQueryState('authors', { defaultValue: '' });
  const [categoryQuery] = useQueryState('category', { defaultValue: '' });
  let filteredPosts = [...initialPosts].sort(
    (a, b) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime(),
  );
  if (authorsQuery.trim()) {
    const authorList = authorsQuery
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);
    if (authorList.length > 0) {
      filteredPosts = filteredPosts.filter((post) =>
        post.authors?.some((author) => authorList.includes(author)),
      );
    }
  }
  if (categoryQuery.trim()) {
    const categoryList = categoryQuery
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    if (categoryList.length > 0) {
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.category &&
          categoryList.some((cat) =>
            post.category?.toLowerCase().includes(cat.toLowerCase()),
          ),
      );
    }
  }
  if (filteredPosts.length === 0) {
    return <ResultEmpty />;
  }

  return (
    <Table className="bg-background">
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
        {filteredPosts.map((post) => (
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
              <ModalDelete id={String(post._id)} type="post" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
