'use server';

import connectDB from '@/lib/mongodb';
import { PostModel } from '@/models/post';
import { Post } from '@/types/post';

interface Params {
  slug: string;
}

export const getPost = async (params: Params): Promise<Post> => {
  await connectDB();
  const post = await PostModel.findOne({ slug: params.slug }).lean<Post>();
  if (!post) {
    throw new Error('پست یافت نشد');
  }
  return {
    ...post,
    _id: post._id?.toString(),
  };
};
