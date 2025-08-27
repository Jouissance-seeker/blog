'use server';

import connectDB from '@/lib/mongodb';
import { ConceptModel } from '@/models/concept';
import { Concept } from '@/types/concept';

export const getConcept = async (slug: string): Promise<Concept | null> => {
  await connectDB();
  const conceptSlug = slug;
  const concept = await ConceptModel.findOne({
    slug: conceptSlug,
  });
  if (!concept) return null;
  return concept.toObject();
};
