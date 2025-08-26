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

  const { id } = params;

  const deletedEssay = await EssayModel.findByIdAndDelete(id);

  return !!deletedEssay;
};
