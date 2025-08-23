"use server";

import connectDB from "@/lib/mongodb";
import { PostModel } from "@/models/post";
import { Post } from "@/types/post";

interface Params {
  post: Omit<Post, "_id" | "createdAt" | "updatedAt">;
}

export const addPost = async (params: Params): Promise<Post> => {
  await connectDB();
  const existingPost = await PostModel.findOne({ slug: params.post.slug });
  if (existingPost) {
    throw new Error("پستی با این اسلاگ وجود دارد");
  }
  const newPost = new PostModel(params.post);
  await newPost.save();
  return {
    ...newPost.toObject(),
    _id: newPost._id?.toString(),
  };
};
