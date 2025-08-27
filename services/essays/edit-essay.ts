'use server';

import connectDB from '@/lib/mongodb';
import { EssayModel } from '@/models/essay';
import { Essay } from '@/types/essay';

export const editEssay = async (params: Essay): Promise<Essay | null> => {
  await connectDB();
  const updatedEssay = await EssayModel.findByIdAndUpdate(params.id, {
    ...params,
  });
  if (!updatedEssay) {
    return null;
  }
  return updatedEssay.toObject();
};
