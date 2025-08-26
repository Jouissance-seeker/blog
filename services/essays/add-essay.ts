'use server';

import connectDB from '@/lib/mongodb';
import { EssayModel } from '@/models/essay';
import { Essay } from '@/types/essay';

interface AddEssayParams {
  slug: string;
  title: string;
  summary: string;
  content: string;
  isActive: 'yes' | 'no';
}

export const addEssay = async (params: AddEssayParams): Promise<Essay> => {
  await connectDB();

  const newEssay = new EssayModel({
    ...params,
  });

  const savedEssay = await newEssay.save();

  return {
    ...savedEssay.toObject(),
  };
};
