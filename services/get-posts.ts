'use server';

import connectDB from '@/lib/mongodb';
import { PostModel } from '@/models/post';
import { Post } from '@/types/post';

interface GetPostsParams {
  title: string;
  authors: string | string[];
  category: string;
  slug?: string;
}

const processQueryParam = (param: string) =>
  param
    .split(',')
    .filter((s) => s.trim())
    .map((s) => s.trim());

export const getPosts = async (params: GetPostsParams): Promise<Post[]> => {
  await connectDB();

  const authors = Array.isArray(params.authors)
    ? params.authors
    : processQueryParam(params.authors || '');
  const categories = processQueryParam(params.category);

  const filter: any = {};

  if (params.title?.trim()) {
    filter.title = { $regex: params.title, $options: 'i' };
  }

  if (authors.length > 0) {
    filter.authors = { $in: authors };
  }

  if (categories.length > 0) {
    filter.category = {
      $in: categories.map((category) => new RegExp(category, 'i')),
    };
  }

  if (params.slug?.trim()) {
    filter.slug = { $regex: params.slug, $options: 'i' };
  }

  const posts = await PostModel.find(filter)
    .sort({ createdAt: -1 })
    .lean<Post[]>();

  return posts.map((post) => ({
    ...post,
    _id: post._id?.toString(),
  }));
};
