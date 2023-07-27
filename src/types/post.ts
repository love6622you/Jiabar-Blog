import { z } from "zod";
import { userSchema } from "./user";

export const commentSchema = z.object({
  id: z.string(),
  title: z.string().nullish(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  user: userSchema.pick({ name: true, image: true })
});

export const tagSchema = z.array(z.string());

export const postSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  title: z.string(),
  content: z.string(),
  image: z.string(),
  published: z.boolean(),
  tags: tagSchema,
  author: userSchema.pick({ name: true, image: true }),
  comments: z.array(commentSchema).optional(),
  hearts_count: z.number().optional()
});

export type IPost = z.infer<typeof postSchema>;
export type IComment = z.infer<typeof commentSchema>;
export type ITag = z.infer<typeof tagSchema>;
