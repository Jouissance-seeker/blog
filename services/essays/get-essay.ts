'use server';

import connectDB from '@/lib/mongodb';
import { EssayModel } from '@/models/essay';
import { Essay } from '@/types/essay';

export const getEssay = async (slug: string): Promise<Essay | null> => {
  await connectDB();
  const essay = await EssayModel.findOne({
    slug,
  });
  if (!essay) return null;
  return essay.toObject();
};
