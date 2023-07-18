"use client";

import { LuLoader2 } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CommentFormSchema } from "@/lib/validation-schema";
import { MAX_INPUT_LIMIT } from "@/constant/Input";
import request, { AxiosError } from "@/lib/request";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

type CommentFormValues = z.infer<typeof CommentFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<CommentFormValues> = {};

export function CommentForm() {
  const { slug: postId } = useParams();

  const queryClient = useQueryClient();
  // Mutation
  const { mutate: addComment, isLoading } = useMutation(
    async (data: { postId: string; content: string }) => {
      await request({
        url: `/posts/${postId}/addComment`,
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
      onSuccess: async () => {
        queryClient.invalidateQueries(["comments", postId]);
        toast({
          title: "Success"
        });
        await reset({ content: "" });
      }
    }
  );

  // Form
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues,
    mode: "onChange"
  });
  const { handleSubmit, control, watch, reset } = form;
  const currentLength = watch().content?.length || 0;

  const onSubmit = async (data: CommentFormValues) => {
    await addComment({ ...data, postId });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-5">
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <Textarea
                    placeholder="留下您的評論"
                    className="resize-none"
                    maxLength={MAX_INPUT_LIMIT}
                    {...field}
                  />
                  <p className="text-right text-gray-700">
                    {currentLength}/{MAX_INPUT_LIMIT}
                  </p>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right">
          <Button
            type="submit"
            variant={"outline"}
            className={cn("px-6")}
            disabled={isLoading}
          >
            {isLoading && <LuLoader2 className="mr-2.5 h-4 w-4 animate-spin" />}
            送出
          </Button>
        </div>
      </form>
    </Form>
  );
}
