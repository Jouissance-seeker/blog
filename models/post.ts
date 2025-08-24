import { Schema, model, models } from 'mongoose';
import { Post } from '@/types/post';

const postSchema = new Schema<Post>(
  {
    authors: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    category: {
      type: String,
      required: true,
      trim: true,
    },
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
  },
  {
    timestamps: true,
  },
);

postSchema.index({ authors: 1 });
postSchema.index({ category: 1 });
postSchema.index({ createdAt: -1 });

export const PostModel = models.Post || model<Post>('Post', postSchema);
