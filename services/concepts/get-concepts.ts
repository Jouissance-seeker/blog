'use server';

import connectDB from '@/lib/mongodb';
import { ConceptModel } from '@/models/concept';
import { Concept } from '@/types/concept';

export const getConcepts = async (): Promise<Concept[]> => {
  await connectDB();
  const concepts = await ConceptModel.find();
  return concepts.map((concept) => concept.toObject());
};
