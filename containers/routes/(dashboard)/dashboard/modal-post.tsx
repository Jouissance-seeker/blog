'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/uis/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/uis/form';
import { Input } from '@/uis/input';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from '@/uis/dialog';
import { Textarea } from '@/uis/textarea';
import { addPost } from '@/services/add-post';
import { editPost } from '@/services/edit-post';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Post } from '@/types/post';
import { Pencil } from 'lucide-react';
import MultipleSelector from '@/uis/multiple-selector';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/uis/select';

const formSchema = z.object({
  _id: z.string().optional(),
  slug: z.string().min(1).regex(/^\S+$/),
  title: z.string().min(1),
  authors: z.array(z.string()).min(1),
  category: z.string().min(1),
  quote: z.string().optional(),
  summary: z.string().min(1),
  content: z.string().min(1),
});

interface ModalPostProps {
  post?: Post;
  mode: 'add' | 'edit';
}

export function ModalPost(props: ModalPostProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isEditMode = props.mode === 'edit' || !!props.post;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (open && props.post) {
      form.reset({
        _id: props.post._id?.toString(),
        slug: props.post.slug,
        title: props.post.title,
        quote: props.post.quote,
        summary: props.post.summary,
        content: props.post.content,
        authors: props.post.authors,
        category: props.post.category,
      });
    }
  }, [open, props.post]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const postData = {
      ...values,
      ...(values.quote &&
        values.quote.trim() !== '' && { quote: values.quote.trim() }),
    };

    if (isEditMode) {
      await editPost({ post: postData as any });
      toast.success('پست با موفقیت ویرایش شد');
    } else {
      await addPost({ post: postData });
      toast.success('پست با موفقیت افزوده شد');
    }
    setOpen(false);
    router.push('/dashboard');
  }

  const defaultTrigger = isEditMode ? (
    <Button
      size={'icon'}
      variant={'ghost'}
      className="text-blue-500 hover:text-blue-500 hover:bg-blue-500/10"
    >
      <Pencil />
    </Button>
  ) : (
    <Button size={'lg'} className="py-6 px-8">
      افزودن
    </Button>
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>{defaultTrigger}</DialogTrigger>
      <DialogContent
        showCloseButton={true}
        className="h-fit p-4 w-md sm:w-lg md:w-xl lg:w-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'ویرایش پست' : 'افزودن پست'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شناسه</FormLabel>
                  <FormControl>
                    <Input dir="ltr" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اندیشمندان</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      defaultOptions={[
                        {
                          label: 'لکان',
                          value: 'lacan',
                        },
                        {
                          label: 'یونگ',
                          value: 'jung',
                        },
                        {
                          label: 'کانت',
                          value: 'kant',
                        },
                      ]}
                      value={
                        field.value?.map((tag) => ({
                          label: tag,
                          value: tag,
                        })) || []
                      }
                      onChange={(options) => {
                        field.onChange(options.map((option) => option.value));
                      }}
                      emptyIndicator={
                        <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                          همه اندیشمندان انتخاب شده
                        </p>
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>دسته بندی</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger />
                      <SelectContent>
                        <SelectItem value="essay">جستار</SelectItem>
                        <SelectItem value="concept">مفاهیم</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نقل قول (اختیاری)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>چکیده</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>محتوا</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full !py-7">
              {isEditMode ? 'ویرایش' : 'افزودن'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
