"use server";

import connectDB from "@/lib/mongodb";
import { PostModel } from "@/models/post";
import { Post } from "@/types/post";

interface Params {
  post: Omit<Post, "_id" | "createdAt" | "updatedAt">;
}

// Function to clean ** characters from content
const cleanContent = (content: string): string => {
  return content.replace(/\*\*/g, "");
};

export const addPost = async (params: Params): Promise<Post> => {
  await connectDB();
  const existingPost = await PostModel.findOne({ slug: params.post.slug });
  if (existingPost) {
    throw new Error("پستی با این اسلاگ وجود دارد");
  }

  // Clean content before saving
  const cleanedPost = {
    ...params.post,
    content: cleanContent(params.post.content),
  };

  const newPost = new PostModel(cleanedPost);
  await newPost.save();
  return {
    ...newPost.toObject(),
    _id: newPost._id?.toString(),
  };
};
