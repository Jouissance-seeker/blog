'use server';

import connectDB from '@/lib/mongodb';
import { EssayModel } from '@/models/essay';
import { Essay } from '@/types/essay';

export const getEssay = async (slug: string[]): Promise<Essay | null> => {
  await connectDB();

  if (slug.length < 2) return null;

  const authors = slug[0].split('-');
  const essaySlug = slug[1];

  const essay = await EssayModel.findOne({
    authors: { $in: authors },
    slug: essaySlug,
    isActive: 'yes',
  }).lean<Essay>();

  if (!essay) return null;

  return {
    ...essay,
    _id: essay._id?.toString(),
  };
};
