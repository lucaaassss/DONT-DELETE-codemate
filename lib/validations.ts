import * as z from "zod";

export const QuestionsSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(130, "Title cannot exceed 130 characters"),
  explanation: z
    .string()
    .min(100, "Explanation must be at least 100 characters long"),
  tags: z
    .array(
      z
        .string()
        .min(1, "Tag must be at least 1 character long")
        .max(15, "Tag cannot exceed 15 characters")
    )
    .min(1, "At least 1 tag is required")
    .max(3, "Cannot have more than 3 tags"), // meaning that we need a minimum of 1 tag and a maximum of 3 tags and each tag needs to be string with a minimum of 1 character and a maximum of 15 characters
});

export const AnswerSchema = z.object({
  answer: z.string().min(100, "Answer must be at least 100 characters long"),
});
