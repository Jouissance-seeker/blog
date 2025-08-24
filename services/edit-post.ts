'use server';

import connectDB from '@/lib/mongodb';
import { PostModel } from '@/models/post';
import { Post } from '@/types/post';
import { Types } from 'mongoose';

interface Params {
  post: Post;
}

export const editPost = async (params: Params): Promise<Post> => {
  await connectDB();

  if (!params.post._id) {
    throw new Error('آی دی پست یافت نشد');
  }

  if (!Types.ObjectId.isValid(params.post._id.toString())) {
    throw new Error('آی دی پست نامعتبر است');
  }

  if (params.post.slug) {
    const existingPost = await PostModel.findOne({
      slug: params.post.slug,
      _id: { $ne: params.post._id },
    });
    if (existingPost) {
      throw new Error('پستی با این اسلاگ وجود دارد');
    }
  }

  const updatedPost = await PostModel.findByIdAndUpdate(
    params.post._id,
    {
      authors: params.post.authors,
      category: params.post.category,
      title: params.post.title,
      slug: params.post.slug,
      quote: params.post.quote,
      summary: params.post.summary,
      content: params.post.content,
    },
    { new: true, lean: true },
  ).lean<Post>();

  if (!updatedPost) {
    throw new Error('پست یافت نشد');
  }

  return {
    ...updatedPost,
    _id: updatedPost._id?.toString(),
  };
};
