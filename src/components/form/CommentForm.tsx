import { useForm } from "react-hook-form";
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

const MAX_TEXT_COUNT = 300;

const CommentFormSchema = z.object({
  content: z.string({ required_error: "請輸入內容" }).max(MAX_TEXT_COUNT)
});

type CommentFormValues = z.infer<typeof CommentFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<CommentFormValues> = {
  //   content: ""
};

export function CommentForm() {
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues,
    mode: "onChange"
  });

  const { handleSubmit, control, watch } = form;

  const currentLength = watch().content?.length || 0;

  function onSubmit(data: CommentFormValues) {
    console.log(data);
  }

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
                    maxLength={MAX_TEXT_COUNT}
                    {...field}
                  />
                  <p className='text-right text-gray-700'>
                    {currentLength}/{MAX_TEXT_COUNT}
                  </p>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right">
          <Button type="submit" variant={"outline"} className="px-6">
            送出
          </Button>
        </div>
      </form>
    </Form>
  );
}
