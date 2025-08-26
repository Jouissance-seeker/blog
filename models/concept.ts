import { Schema, model, models } from 'mongoose';
import { Concept } from '@/types/concept';

const conceptSchema = new Schema<Concept>(
  {
    slug: {
      type: String,
      required: false,
      default: '',
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    quote: {
      type: String,
      required: false,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    isActive: {
      type: String,
      enum: ['yes', 'no'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

conceptSchema.index({ createdAt: -1 });

export const ConceptModel =
  models.Concept || model<Concept>('Concept', conceptSchema);
