'use client';

import * as React from 'react';
import { Button } from '@/uis/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/uis/dialog';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';
import { deletePost } from '@/services/posts/delete-post';
import { Trash2 } from 'lucide-react';
import { deleteEssay } from '@/services/essays/delete-essay';
import { deleteConcept } from '@/services/concepts/delete-concept';

interface ModalDeleteProps {
  id: string;
  type: 'post' | 'essay' | 'concept';
}

export function ModalDelete(props: ModalDeleteProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleDeletePost = async () => {
    if (props.type === 'post') {
      await deletePost({ id: props.id });
    } else if (props.type === 'essay') {
      await deleteEssay({ id: props.id });
    } else if (props.type === 'concept') {
      await deleteConcept({ id: props.id });
    }
    toast.success('با موفقیت حذف شد');
    setOpen(false);
    router.push(pathname);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={'icon'}
          variant={'ghost'}
          className="text-red-500 hover:text-red-500 hover:bg-red-500/10"
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={true}
        className="h-fit p-4 w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>حذف</DialogTitle>
        </DialogHeader>
        <p className="text-center text-smp font-medium py-4">
          آیا می خواهید حذف کنید؟
        </p>
        <div className="flex gap-2">
          <Button
            variant={'destructive'}
            className="w-full py-5 flex-1"
            onClick={handleDeletePost}
          >
            بله
          </Button>
          <Button
            variant={'outline'}
            className="w-full flex-1 py-5"
            onClick={() => setOpen(false)}
          >
            خیر
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
