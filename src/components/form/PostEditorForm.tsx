"use client";

import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { AxiosError } from "@/lib/request";
import { cn, convertBase64ToFile, convertFileToBase64 } from "@/lib/utils";
import { PostFormSchema } from "@/lib/validation-schema";
import InputTags from "../input/InputTags";
import SpinLoading from "../shared/SpinLoading";

type PostEditorFormType = {
  onClose: () => void;
};

type PostEditorFormValues = z.infer<typeof PostFormSchema>;

const getDefaultValues = () => {
  let defaultValues = {
    title: "",
    tags: [],
    content: ""
  };

  const base64InfoString = localStorage.getItem("formBase64Info") ?? "";
  const tempPostDataString = localStorage.getItem("tempPostData") ?? "";

  const base64Info = base64InfoString && JSON.parse(base64InfoString);
  let tempData = tempPostDataString && JSON.parse(tempPostDataString);

  if (base64Info) {
    const { fileData, fileName, fileType } = base64Info;
    const file = convertBase64ToFile(fileData, fileName, fileType);
    tempData = {
      ...tempData,
      image: file
    };
  }
  defaultValues = { ...defaultValues, ...tempData };

  return defaultValues;
};

export const PostEditorForm = ({ onClose }: PostEditorFormType) => {
  const queryClient = useQueryClient();

  // UseMutation
  const { mutate: addPost, isLoading } = useMutation(
    async (data: object) => {
      await request({
        url: "/posts",
        method: "POST",
        data
      });
    },
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast({
            title: error?.response?.data?.message
          });
        }
      },
      onSuccess() {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["recommendedTags"]);
        toast({
          title: "Success"
        });
        onClose();
        localStorage.removeItem("tempPostData");
        localStorage.removeItem("formBase64Info");
      }
    }
  );

  // About form & form action
  const form = useForm<PostEditorFormValues>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: getDefaultValues(),
    mode: "onChange"
  });

  const { handleSubmit, control, getValues, setValue, trigger } = form;

  const onSubmit = async (data: PostEditorFormValues) => {
    const image = await convertFileToBase64(data.image);
    await addPost({ ...data, image, category: "Movie" });
  };

  // Other functions
  const tempFormDataToLocalStorage = async () => {
    const data = getValues();
    const file = data.image;
    let base64Info = null;

    if (file) {
      // 1. Temp base64 info
      base64Info = await convertFileToBase64(file);
      localStorage.setItem(
        "formBase64Info",
        JSON.stringify({
          fileData: base64Info,
          fileName: file.name,
          fileType: file.type
        })
      );
    }

    // 2. Save data to storage
    localStorage.setItem("tempPostData", JSON.stringify({ ...data, image: base64Info, published: false }));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => {
          tempFormDataToLocalStorage();
        }}
        className="h-full space-y-4"
      >
        <FormField
          control={control}
          name="image"
          render={({ field: { value, name, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>文章封面圖</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={cn(
                    `text-transparent file:text-transparent before:text-gray-500 before:content-[attr(data-name)]`
                  )}
                  data-name={getValues().image?.name ?? "Upload image"}
                  type="file"
                  accept=".jpeg, .jpg, .png, .webp"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target && event.target.files) {
                      onChange(event.target.files[0]);
                      tempFormDataToLocalStorage();
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
                <Input placeholder="New post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="tags"
          render={({ field: { value, name } }) => (
            <FormItem>
              <FormLabel>標籤</FormLabel>
              <FormControl>
                <InputTags
                  name={name}
                  tags={value}
                  limit={4}
                  setValue={setValue}
                  onChange={() => {
                    tempFormDataToLocalStorage();
                    trigger(name);
                  }}
                />
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
                  placeholder="Write your post content"
                  className="h-[calc(100%_-_50px)] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-center pt-1.5 pb-3.5">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <SpinLoading />}
            Create Post
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default PostEditorForm;
