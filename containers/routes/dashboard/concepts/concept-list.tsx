'use client';

import { useQueryState } from 'nuqs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/uis/table';
import Link from 'next/link';
import { ModalConcept } from './modal-concept';
import { authors } from '@/constants/authors';
import { cn } from '@/utils/cn';
import { ResultEmpty } from '@/containers/routes/global/result-empty';
import { Concept } from '@/types/concept';
import { ModalDelete } from '../global/modal-delete';

interface ConceptListProps {
  initialConcepts: Concept[];
}

export const ConceptList = ({ initialConcepts }: ConceptListProps) => {
  const [authorsQuery] = useQueryState('authors', { defaultValue: '' });
  let filteredConcepts = [...initialConcepts].sort(
    (a, b) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime(),
  );
  if (authorsQuery.trim()) {
    const authorList = authorsQuery
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);
    if (authorList.length > 0) {
      filteredConcepts = filteredConcepts.filter((concept) =>
        concept.authors?.some((author) => authorList.includes(author)),
      );
    }
  }
  if (filteredConcepts.length === 0) {
    return <ResultEmpty text="مفهومی یافت نشد ..." />;
  }

  return (
    <Table className="bg-background">
      <TableHeader>
        <TableRow>
          <TableHead>عنوان</TableHead>
          <TableHead>اسلاگ</TableHead>
          <TableHead>اندیشمندان</TableHead>
          <TableHead>نمایش</TableHead>
          <TableHead>عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredConcepts.map((concept) => (
          <TableRow key={concept._id?.toString()}>
            <TableCell>
              <Link
                href={`/concepts/${concept.authors.join('-')}/${concept.slug}`}
              >
                {concept.title}
              </Link>
            </TableCell>
            <TableCell>{concept.slug}</TableCell>
            <TableCell>
              {concept.authors
                ?.map((author) => {
                  const authorData = authors.find((a) => a.en === author);
                  return authorData ? authorData.fa : author;
                })
                .join(' - ')}
            </TableCell>
            <TableCell>
              <span
                className={cn(
                  'px-2 py-1 rounded text-xs',
                  concept.isActive === 'yes'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                )}
              >
                {concept.isActive === 'yes' ? 'بله' : 'خیر'}
              </span>
            </TableCell>
            <TableCell>
              <ModalConcept concept={concept} mode="edit" />
              <ModalDelete id={String(concept._id)} type="concept" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
