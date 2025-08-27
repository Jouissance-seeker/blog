'use server';

import connectDB from '@/lib/mongodb';
import { EssayModel } from '@/models/essay';
import { Essay } from '@/types/essay';

export const editEssay = async (params: Essay): Promise<Essay | null> => {
  await connectDB();

  const { id, ...updateData } = params;

  const updatedEssay = await EssayModel.findByIdAndUpdate(
    id,
    { ...updateData },
    { new: true, runValidators: true },
  ).lean<Essay>();

  if (!updatedEssay) {
    return null;
  }

  return updatedEssay;
};
