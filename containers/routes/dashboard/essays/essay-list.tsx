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
import { ModalEssay } from './modal-essay';

import { cn } from '@/utils/cn';
import { ResultEmpty } from '@/containers/routes/global/result-empty';
import { Essay } from '@/types/essay';
import { ModalDelete } from '../global/modal-delete';

interface EssayListProps {
  initialEssays: Essay[];
}

export const EssayList = (props: EssayListProps) => {
  const filteredEssays = [...props.initialEssays].sort(
    (a, b) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime(),
  );

  if (filteredEssays.length === 0) {
    return <ResultEmpty text="جستاری یافت نشد ..." />;
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
        {filteredEssays.map((essay) => (
          <TableRow key={essay._id?.toString()}>
            <TableCell>
              <Link href={`/essays/${essay.slug}`}>{essay.title}</Link>
            </TableCell>
            <TableCell>{essay.slug}</TableCell>
            <TableCell>
              <span
                className={cn(
                  'px-2 py-1 rounded text-xs',
                  essay.isActive === 'yes'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                )}
              >
                {essay.isActive === 'yes' ? 'بله' : 'خیر'}
              </span>
            </TableCell>
            <TableCell>
              <ModalEssay essay={essay} mode="edit" />
              <ModalDelete id={String(essay._id)} type="essay" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
