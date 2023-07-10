"use client";

import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { FILE_ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constant/Input";

const PostEditorFormSchema = z.object({
  image: z
    .custom<File>()
    .refine((file) => {
      return file && file.size <= MAX_FILE_SIZE;
    })
    .refine((file) => file && FILE_ACCEPTED_IMAGE_TYPES.includes(file.type)),
  title: z.string({ required_error: "輸入文章標題" }),
  tagList: z.array(z.string().max(10, "最多 10 個字元")).optional(),
  content: z.string({ required_error: "輸入文章內容" })
});

type PostEditorFormValues = z.infer<typeof PostEditorFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<PostEditorFormValues> = {
  title: "title",
  tagList: ["javascript", "web"],
  content: "content"
};

export function PostEditorForm() {
  const form = useForm<PostEditorFormValues>({
    resolver: zodResolver(PostEditorFormSchema),
    defaultValues,
    mode: "onChange"
  });

  const { handleSubmit, control, getValues } = form;

  function onSubmit(data: PostEditorFormValues) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full space-y-4">
        <FormField
          control={control}
          name="image"
          render={({ field: { value, name, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>文章封面圖</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="file"
                  placeholder="請上傳檔案"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target && event.target.files) {
                      onChange(event.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>標題</FormLabel>
              <FormControl>
                <Input placeholder="文章標題" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="tagList"
          render={({ field }) => (
            <FormItem>
              <FormLabel>標籤</FormLabel>
              <FormControl>
                <Input placeholder="文章內容" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem className="h-3/5">
              <FormLabel>內容</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="文章內容"
                  className="h-[calc(100%_-_50px)] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-center">
          <Button type="submit">Update profile</Button>
        </div>
      </form>
    </Form>
  );
}
