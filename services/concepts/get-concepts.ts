'use server';

import connectDB from '@/lib/mongodb';
import { ConceptModel } from '@/models/concept';
import { Concept } from '@/types/concept';

export const getConcepts = async (): Promise<Concept[]> => {
  await connectDB();

  const concepts = await ConceptModel.find({ isActive: 'yes' }).lean<
    Concept[]
  >();

  return concepts.map((concept) => ({
    ...concept,
    _id: concept._id?.toString(),
  }));
};
