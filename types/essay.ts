export type Essay = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  isActive: 'yes' | 'no';
  createdAt?: Date;
  updatedAt?: Date;
};
