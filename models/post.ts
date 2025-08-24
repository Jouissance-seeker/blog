import { Schema, model, models } from 'mongoose';
import { Post } from '@/types/post';

const postSchema = new Schema<Post>(
  {
    tags: {
      type: [String],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
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

postSchema.index({ tags: 1 });
postSchema.index({ createdAt: -1 });

export const PostModel = models.Post || model<Post>('Post', postSchema);
