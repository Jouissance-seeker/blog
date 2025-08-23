"use server";

import connectDB from "@/lib/mongodb";
import { PostModel } from "@/models/post";
import { Types } from "mongoose";

interface Params {
  id: string;
}

export const deletePost = async (params: Params): Promise<void> => {
  await connectDB();
  if (!Types.ObjectId.isValid(params.id)) {
    throw new Error("آی دی نامعتبر است");
  }
  const deletedPost = await PostModel.findByIdAndDelete(params.id);
  if (!deletedPost) {
    throw new Error("پست یافت نشد");
  }
};
