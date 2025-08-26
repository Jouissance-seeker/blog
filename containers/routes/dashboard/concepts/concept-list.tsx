'use client';

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
import { cn } from '@/utils/cn';
import { ResultEmpty } from '@/containers/routes/global/result-empty';
import { Concept } from '@/types/concept';
import { ModalDelete } from '../global/modal-delete';

interface ConceptListProps {
  initialConcepts: Concept[];
}

export const ConceptList = (props: ConceptListProps) => {
  const filteredConcepts = [...props.initialConcepts].sort(
    (a, b) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime(),
  );
  if (filteredConcepts.length === 0) {
    return <ResultEmpty text="مفهومی یافت نشد ..." />;
  }

  return (
    <Table className="bg-background">
      <TableHeader>
        <TableRow>
          <TableHead>عنوان</TableHead>
          <TableHead>اسلاگ</TableHead>
          <TableHead>نمایش</TableHead>
          <TableHead>عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredConcepts.map((concept) => (
          <TableRow key={concept._id?.toString()}>
            <TableCell>
              <Link href={`/concepts/${concept.slug}`}>{concept.title}</Link>
            </TableCell>
            <TableCell>{concept.slug}</TableCell>
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
