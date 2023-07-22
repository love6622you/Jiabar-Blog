import { z } from "zod";
import {
  FILE_ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  MAX_INPUT_LIMIT
} from "@/constant/Input";

const TYPE_ERROR = {
  required: "Required"
};

// For creating new post
export const PostFormSchema = z.object({
  image: z
    .custom<File>()
    .refine(
      (file) => {
        return file && file.size <= MAX_FILE_SIZE;
      },
      { message: `檔案大小不能超過 ${MAX_FILE_SIZE / (1024 * 1024)} MB` }
    )
    .refine((file) => file && FILE_ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "必須是圖片格式(png , jpg , jpeg , webp)"
    }),
  title: z
    .string({ required_error: "輸入文章標題" })
    .nonempty(TYPE_ERROR.required),
  tags: z.array(z.string()).nonempty(TYPE_ERROR.required),
  content: z
    .string({ required_error: "輸入文章內容" })
    .nonempty(TYPE_ERROR.required)
});

// For creating comment
export const CommentFormSchema = z.object({
  content: z.string({ required_error: "請輸入內容" }).max(MAX_INPUT_LIMIT)
});
