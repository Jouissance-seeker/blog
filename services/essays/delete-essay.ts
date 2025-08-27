'use server';

import connectDB from '@/lib/mongodb';
import { EssayModel } from '@/models/essay';

interface DeleteEssayParams {
  id: string;
}

export const deleteEssay = async (
  params: DeleteEssayParams,
): Promise<boolean> => {
  await connectDB();
  const deletedEssay = await EssayModel.findByIdAndDelete(params.id);
  return !!deletedEssay;
};
