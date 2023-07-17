import { z } from "zod";
import {
  FILE_ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  MAX_INPUT_LIMIT
} from "@/constant/Input";

// For creating new post
export const PostFormSchema = z.object({
  image: z
    .custom<File>()
    .refine((file) => {
      return file && file.size <= MAX_FILE_SIZE;
    })
    .refine((file) => file && FILE_ACCEPTED_IMAGE_TYPES.includes(file.type)),
  title: z.string({ required_error: "輸入文章標題" }),
  tags: z.array(z.string().max(10, "最多 10 個字元")),
  content: z.string({ required_error: "輸入文章內容" })
});

// For creating comment
export const CommentFormSchema = z.object({
  content: z.string({ required_error: "請輸入內容" }).max(MAX_INPUT_LIMIT)
});
