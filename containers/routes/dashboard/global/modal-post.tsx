"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/uis/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/uis/form";
import { Input } from "@/uis/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/uis/dialog";
import { Textarea } from "@/uis/textarea";
import { Select, SelectValue, SelectTrigger, SelectItem } from "@/uis/select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { addPost } from "@/services/add-post";
import { editPost } from "@/services/edit-post";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import { Pencil } from "lucide-react";

const formSchema = z.object({
  _id: z.string().optional(),
  slug: z.string().min(1).regex(/^\S+$/),
  title: z.string().min(1),
  quote: z.string().min(1),
  summary: z.string().min(1),
  content: z.string().min(1),
  type: z.enum(["concept", "essay"]),
});

interface ModalPostProps {
  post?: Post;
  children?: React.ReactNode;
  mode?: "add" | "edit";
}

export function ModalPost(props: ModalPostProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isEditMode = props.mode === "edit" || !!props.post;

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
        type: props.post.type as "concept" | "essay",
      });
    }
  }, [open, props.post]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditMode) {
      await editPost({ post: values as any });
      toast.success("پست با موفقیت ویرایش شد");
    } else {
      await addPost({ post: values });
      toast.success("پست با موفقیت افزوده شد");
    }
    setOpen(false);
    router.push("/dashboard");
  }

  const defaultTrigger = isEditMode ? (
    <Button
      size={"icon"}
      variant={"ghost"}
      className="text-blue-500 hover:text-blue-500 hover:bg-blue-500/10"
    >
      <Pencil />
    </Button>
  ) : (
    <Button size={"lg"} className="py-6 px-8">
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
      <DialogTrigger asChild>{props.children || defaultTrigger}</DialogTrigger>
      <DialogContent
        showCloseButton={true}
        className="h-fit p-4 w-md sm:w-lg md:w-xl lg:w-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{isEditMode ? "ویرایش پست" : "افزودن پست"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع</FormLabel>
                  <FormControl>
                    <Select
                      dir="rtl"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full py-4.5">
                        <SelectValue placeholder="نوع" />
                      </SelectTrigger>
                      <SelectPrimitive.Content
                        position="popper"
                        side="bottom"
                        align="end"
                        sideOffset={4}
                        avoidCollisions
                        className="z-50 w-[var(--radix-select-trigger-width)] max-h-60 overflow-y-auto rounded-md border bg-popover shadow-md"
                      >
                        <SelectPrimitive.Viewport className="p-1">
                          <SelectItem value="concept">مفهوم</SelectItem>
                          <SelectItem value="essay">جستار</SelectItem>
                        </SelectPrimitive.Viewport>
                      </SelectPrimitive.Content>
                    </Select>
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
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نقل قول</FormLabel>
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
              {isEditMode ? "ویرایش" : "افزودن"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
