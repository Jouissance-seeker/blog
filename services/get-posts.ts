"use server";

import connectDB from "@/lib/mongodb";
import { PostModel } from "@/models/post";
import { Post } from "@/types/post";

interface GetPostsParams {
  title: string;
  author: string;
  type: string;
}

const createCombinationFilter = (author: string, type: string) => ({
  tags: { $regex: `${author} / ${type}`, $options: "i" },
});

export const getPosts = async (params: GetPostsParams): Promise<Post[]> => {
  await connectDB();
  const authors = params.author
    .split(",")
    .filter(Boolean)
    .map((s) => s.trim());
  const types = params.type
    .split(",")
    .filter(Boolean)
    .map((s) => s.trim());

  const tagFilters = authors.flatMap((author) =>
    types.map((type) => createCombinationFilter(author, type))
  );
  const filter = {
    title: { $regex: params.title, $options: "i" },
    $or: tagFilters,
  };
  const posts = await PostModel.find(filter)
    .sort({ createdAt: -1 })
    .lean<Post[]>();

  return posts.map((post) => ({
    ...post,
    _id: post._id?.toString(),
  }));
};
