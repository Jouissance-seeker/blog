'use server';

import connectDB from '@/lib/mongodb';
import { PostModel } from '@/models/post';
import { Post } from '@/types/post';

interface Params {
  authors: string;
  category: string;
  slug: string;
}

export const getPost = async (params: Params): Promise<Post> => {
  await connectDB();

  // find post by matching authors, category, and slug
  const post = await PostModel.findOne({
    authors: { $in: [params.authors] },
    category: params.category,
    slug: params.slug || 'post',
  }).lean<Post>();

  if (!post) {
    throw new Error('پست یافت نشد');
  }

  return {
    ...post,
    _id: post._id?.toString(),
  };
};
