import { Types } from 'mongoose';

export type Post = {
  _id?: Types.ObjectId | string;
  tags: string[];
  title: string;
  slug: string;
  quote?: string;
  summary: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
};
