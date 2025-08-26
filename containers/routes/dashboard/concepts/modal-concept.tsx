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
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Concept } from '@/types/concept';
import { Pencil } from 'lucide-react';

import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '@/uis/select';

import { addConcept } from '@/services/concepts/add-concept';
import { editConcept } from '@/services/concepts/edit-concept';

const formSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  quote: z.string().optional(),
  summary: z.string().min(1),
  content: z.string().min(1),
  isActive: z.enum(['yes', 'no']),
});

interface ModalConceptProps {
  concept?: Concept;
  mode: 'add' | 'edit';
}

export function ModalConcept(props: ModalConceptProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = props.mode === 'edit' || !!props.concept;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (open && props.concept) {
      form.reset({
        id: props.concept._id?.toString(),
        slug: props.concept.slug,
        title: props.concept.title,
        quote: props.concept.quote || '',
        summary: props.concept.summary,
        content: props.concept.content,
        isActive: props.concept.isActive,
      });
    }
  }, [open, props.concept, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const conceptData = {
      ...values,
      ...(values.quote &&
        values.quote.trim() !== '' && { quote: values.quote.trim() }),
    };
    if (isEditMode) {
      await editConcept(conceptData as any);
      toast.success('با موفقیت ویرایش شد');
    } else {
      await addConcept(conceptData);
      toast.success('با موفقیت افزوده شد');
    }
    setOpen(false);
    const currentParams = searchParams.toString();
    const dashboardUrl = currentParams
      ? `/dashboard/concepts?${currentParams}`
      : '/dashboard/concepts';
    router.push(dashboardUrl);
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
    <Button size={'lg'} className="py-5.5 px-8">
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
          <DialogTitle>{isEditMode ? 'ویرایش' : 'افزودن'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسلاگ</FormLabel>
                  <FormControl>
                    <Input dir="ltr" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
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
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نمایش</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue>
                          {field.value === 'yes' ? 'بله' : 'خیر'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent
                        avoidCollisions={true}
                        position="popper"
                        sideOffset={4}
                        className="bg-background"
                      >
                        {[
                          {
                            label: 'بله',
                            value: 'yes',
                          },
                          {
                            label: 'خیر',
                            value: 'no',
                          },
                        ].map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
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
