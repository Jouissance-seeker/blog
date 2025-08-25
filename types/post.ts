import { Types } from 'mongoose';

export type Post = {
  _id?: Types.ObjectId | string;
  authors: string[];
  category: string;
  slug: string;
  title: string;
  quote?: string;
  summary: string;
  content: string;
  isActive: 'yes' | 'no';
  createdAt?: Date;
  updatedAt?: Date;
};
