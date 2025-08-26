'use server';

import connectDB from '@/lib/mongodb';
import { ConceptModel } from '@/models/concept';

interface DeleteConceptParams {
  id: string;
}

export const deleteConcept = async (
  params: DeleteConceptParams,
): Promise<boolean> => {
  await connectDB();

  const { id } = params;

  const deletedConcept = await ConceptModel.findByIdAndDelete(id);

  return !!deletedConcept;
};
