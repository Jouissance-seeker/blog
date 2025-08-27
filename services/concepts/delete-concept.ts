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
  const deletedConcept = await ConceptModel.findByIdAndDelete(params.id);
  return !!deletedConcept;
};
