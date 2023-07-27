import { z } from "zod";

export const responseSchema = z.object({
  status: z.enum(["success", "fail"]),
  data: z.any(),
  message: z.string().nullish()
});
export type IResponse = z.infer<typeof responseSchema>;
