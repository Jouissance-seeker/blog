'use server';

import connectDB from '@/lib/mongodb';
import { ConceptModel } from '@/models/concept';
import { Concept } from '@/types/concept';

export const addConcept = async (params: Concept): Promise<Concept> => {
  await connectDB();
  const newConcept = new ConceptModel({
    ...params,
  });
  const savedConcept = await newConcept.save();
  return savedConcept.toObject();
};
