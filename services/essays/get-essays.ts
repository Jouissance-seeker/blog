'use server';

import connectDB from '@/lib/mongodb';
import { EssayModel } from '@/models/essay';
import { Essay } from '@/types/essay';

export const getEssays = async (): Promise<Essay[]> => {
  await connectDB();

  const essays = await EssayModel.find({ isActive: 'yes' }).lean<Essay[]>();

  return essays.map((essay) => ({
    ...essay,
    _id: essay._id?.toString(),
  }));
};
