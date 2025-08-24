'use server';

import connectDB from '@/lib/mongodb';
import { PostModel } from '@/models/post';
import { Post } from '@/types/post';

interface GetPostsParams {
  title: string;
  author: string;
  type: string;
}

const createTagFilter = (value: string) => ({
  tags: { $regex: value, $options: 'i' },
});

const createCombinationFilter = (author: string, type: string) => ({
  tags: { $regex: `${author} / ${type}`, $options: 'i' },
});

const processQueryParam = (param: string) =>
  param
    .split(',')
    .filter((s) => s.trim())
    .map((s) => s.trim());

export const getPosts = async (params: GetPostsParams): Promise<Post[]> => {
  await connectDB();

  const authors = processQueryParam(params.author);
  const types = processQueryParam(params.type);

  const tagFilters =
    authors.length > 0 && types.length > 0
      ? authors.flatMap((author) =>
          types.map((type) => createCombinationFilter(author, type)),
        )
      : authors.length > 0
        ? authors.map(createTagFilter)
        : types.length > 0
          ? types.map(createTagFilter)
          : [];

  const filter: any = {};

  if (params.title?.trim()) {
    filter.title = { $regex: params.title, $options: 'i' };
  }

  if (tagFilters.length > 0) {
    filter.$or = tagFilters;
  }

  const posts = await PostModel.find(filter)
    .sort({ createdAt: -1 })
    .lean<Post[]>();

  return posts.map((post) => ({
    ...post,
    _id: post._id?.toString(),
  }));
};
