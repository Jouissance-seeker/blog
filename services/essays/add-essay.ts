'use server';

import connectDB from '@/lib/mongodb';
import { EssayModel } from '@/models/essay';
import { Essay } from '@/types/essay';

export const addEssay = async (params: Essay): Promise<Essay> => {
  await connectDB();
  const newEssay = new EssayModel({
    ...params,
  });
  const savedEssay = await newEssay.save();
  return savedEssay.toObject();
};
