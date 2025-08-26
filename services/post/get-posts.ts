'use server';

import connectDB from '@/lib/mongodb';
import { PostModel } from '@/models/post';
import { Post } from '@/types/post';

export const getPosts = async (): Promise<Post[]> => {
  await connectDB();
  const posts = await PostModel.find().lean<Post[]>();

  return posts.map((post) => ({
    ...post,
    _id: post._id?.toString(),
  }));
};
