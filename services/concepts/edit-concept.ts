'use server';

import connectDB from '@/lib/mongodb';
import { ConceptModel } from '@/models/concept';
import { Concept } from '@/types/concept';

interface EditConceptParams {
  id: string;
  slug?: string;
  title?: string;
  summary?: string;
  content?: string;
  isActive?: 'yes' | 'no';
}

export const editConcept = async (
  params: EditConceptParams,
): Promise<Concept | null> => {
  await connectDB();

  const { id, ...updateData } = params;

  const updatedConcept = await ConceptModel.findByIdAndUpdate(
    id,
    { ...updateData },
    { new: true, runValidators: true },
  ).lean<Concept>();

  if (!updatedConcept) {
    return null;
  }

  return {
    ...updatedConcept,
  };
};
