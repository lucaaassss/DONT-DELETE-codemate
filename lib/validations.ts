import * as z from "zod";

export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3), // meaning that we need a minimum of 1 tag and a maximum of 3 tags and each tag needs to be string with a minimum of 1 character and a maximum of 15 characters
});
