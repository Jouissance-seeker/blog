'use server';

import connectDB from '@/lib/mongodb';
import { EssayModel } from '@/models/essay';
import { Essay } from '@/types/essay';

interface EditEssayParams {
  id: string;
  slug?: string;
  title?: string;
  quote?: string;
  summary?: string;
  content?: string;
  isActive?: 'yes' | 'no';
}

export const editEssay = async (
  params: EditEssayParams,
): Promise<Essay | null> => {
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

  return {
    ...updatedEssay,
    _id: updatedEssay._id?.toString(),
  };
};
