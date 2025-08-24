'use server';

import connectDB from '@/lib/mongodb';
import { PostModel } from '@/models/post';
import { Post } from '@/types/post';
import { authors } from '@/constants/authors';
import { category } from '@/constants/category';

interface Params {
  authors: string;
  category: string;
  slug: string;
}

export const getPost = async (params: Params): Promise<Post> => {
  await connectDB();

  const authorNames = params.authors.split('-');
  const persianAuthors = authorNames
    .map((author) => authors.find((a) => a.en === author)?.fa)
    .filter(Boolean);

  const persianCategory = category.find((c) => c.en === params.category)?.fa;

  const post = await PostModel.findOne({
    authors: { $all: persianAuthors },
    category: persianCategory,
    slug: params.slug,
  }).lean<Post>();

  if (!post) {
    throw new Error('پست یافت نشد');
  }

  return {
    ...post,
    _id: post._id?.toString(),
  };
};
