'use server';

import connectDB from '@/lib/mongodb';
import { ConceptModel } from '@/models/concept';
import { Concept } from '@/types/concept';

export const editConcept = async (params: Concept): Promise<Concept | null> => {
  await connectDB();
  const updatedConcept = await ConceptModel.findByIdAndUpdate(params.id, {
    ...params,
  });
  if (!updatedConcept) {
    return null;
  }
  return updatedConcept.toObject();
};
