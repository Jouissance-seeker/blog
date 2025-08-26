import { Essay } from '@/types/essay';
import { Schema, model, models } from 'mongoose';

const essaySchema = new Schema<Essay>(
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

essaySchema.index({ createdAt: -1 });

export const EssayModel = models.Essay || model<Essay>('Essay', essaySchema);
