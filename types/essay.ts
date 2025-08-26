import { Types } from 'mongoose';

export type Essay = {
  _id?: Types.ObjectId | string;
  slug: string;
  title: string;
  quote?: string;
  summary: string;
  content: string;
  isActive: 'yes' | 'no';
  createdAt?: Date;
  updatedAt?: Date;
};
