import * as z from "zod";

export const QuestionsSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(150, "Title cannot exceed 150 characters"),
  explanation: z
    .string()
    .min(20, "Explanation must be at least 20 characters long"),
  tags: z
    .array(
      z
        .string()
        .min(1, "Tag must be at least 1 character long")
        .max(20, "Tag cannot exceed 20 characters")
    )
    .min(1, "At least 1 tag is required"), // meaning that we need a minimum of 1 tag and each tag needs to be string with a minimum of 1 character and a maximum of 15 characters
});

export const AnswerSchema = z.object({
  answer: z.string().min(20, "Answer must be at least 20 characters long"),
});

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters long")
    .max(30, "Name cannot exceed 30 characters"),
  username: z
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(25, "Username cannot exceed 25 characters"),
  bio: z
    .string()
    .min(1, "Bio must be at least 1 character long")
    .max(150, "Bio cannot exceed 150 characters")
    .optional()
    .or(z.literal("")),
  portfolioWebsite: z
    .string()
    .url("Invalid URL format")
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters long")
    .max(100, "Location cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
});
