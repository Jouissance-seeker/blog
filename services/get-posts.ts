"use server";

import connectDB from "@/lib/mongodb";
import { PostModel } from "@/models/post";
import { Post } from "@/types/post";
import { Tab } from "@/types/tab";

interface Params {
  type: Tab;
}

export const getPosts = async (params: Params): Promise<Post[]> => {
  await connectDB();
  let query = {};
  if (params.type !== "all") {
    query = { type: params.type };
  }
  const posts = await PostModel.find(query)
    .sort({ createdAt: -1 })
    .lean<Post[]>();
  return posts.map((post) => ({
    ...post,
    _id: post._id?.toString(),
  }));
};
