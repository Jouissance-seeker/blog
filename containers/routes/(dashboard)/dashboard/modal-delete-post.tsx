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
import { useRouter } from 'next/navigation';
import { deletePost } from '@/services/delete-post';
import { Trash2 } from 'lucide-react';

interface ModalDeletePostProps {
  id: string;
}

export function ModalDeletePost(props: ModalDeletePostProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleDeletePost = async () => {
    await deletePost({ id: props.id });
    toast.success('پست با موفقیت حذف شد');
    setOpen(false);
    router.push('/dashboard');
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
          <DialogTitle>حذف پست</DialogTitle>
        </DialogHeader>
        <p className="text-center text-smp font-medium py-4">
          آیا می خواهید این پست را حذف کنید؟
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
