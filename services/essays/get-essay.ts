'use server';

import connectDB from '@/lib/mongodb';
import { EssayModel } from '@/models/essay';
import { Essay } from '@/types/essay';

export const getEssay = async (slug: string): Promise<Essay | null> => {
  await connectDB();

  const essaySlug = slug;

  const essay = await EssayModel.findOne({
    slug: essaySlug,
  }).lean<Essay>();

  if (!essay) return null;

  return {
    ...essay,
    _id: essay._id?.toString(),
  };
};
