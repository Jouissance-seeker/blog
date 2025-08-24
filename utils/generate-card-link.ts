import { authors } from '@/constants/authors';
import { category } from '@/constants/category';

type Params = {
  authors: string[];
  category: string;
  slug: string;
};

export const generateCardLink = (params: Params) => {
  const authorsStr = params.authors
    .map((author) => authors.find((a) => a.fa === author)?.en || author)
    .join('-');
  const categoryEn =
    category.find((c) => c.fa === params.category)?.en || params.category;

  const slug = params.slug || 'post';

  return `/${authorsStr}/${categoryEn}/${slug}`;
};
