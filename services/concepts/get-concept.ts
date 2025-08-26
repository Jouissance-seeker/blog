'use server';

import connectDB from '@/lib/mongodb';
import { ConceptModel } from '@/models/concept';
import { Concept } from '@/types/concept';

export const getConcept = async (slug: string[]): Promise<Concept | null> => {
  await connectDB();

  if (slug.length < 2) return null;

  const author = slug[0];
  const conceptSlug = slug[1];

  const concept = await ConceptModel.findOne({
    author: author,
    slug: conceptSlug,
    isActive: 'yes',
  }).lean<Concept>();

  if (!concept) return null;

  return {
    ...concept,
    _id: concept._id?.toString(),
  };
};
