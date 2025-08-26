'use server';

import connectDB from '@/lib/mongodb';
import { ConceptModel } from '@/models/concept';
import { Concept } from '@/types/concept';

interface AddConceptParams {
  slug: string;
  title: string;
  quote?: string;
  summary: string;
  content: string;
  isActive: 'yes' | 'no';
}

export const addConcept = async (
  params: AddConceptParams,
): Promise<Concept> => {
  await connectDB();

  const newConcept = new ConceptModel({
    ...params,
  });

  const savedConcept = await newConcept.save();

  return {
    ...savedConcept.toObject(),
    _id: savedConcept._id?.toString(),
  };
};
