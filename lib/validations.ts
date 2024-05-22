import { Profanity } from "@/constants/profanity";
import * as z from "zod";

const profanityList = Profanity;

// function to check for profanity
const containsProfanity = (value: string | undefined): boolean => {
  if (!value) return false;
  return profanityList.some((word) => value.toLowerCase().includes(word));
};

// Apply the profanity filter to the schemas
export const QuestionsSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(150, "Title cannot exceed 150 characters")
    .refine((value) => !containsProfanity(value), {
      message: "Title contains profanity word",
    }),
  explanation: z
    .string()
    .min(20, "Explanation must be at least 20 characters long")
    .refine((value) => !containsProfanity(value), {
      message: "Explanation contains profanity word",
    }),
  tags: z
    .array(
      z
        .string()
        .min(1, "Tag must be at least 1 character long")
        .max(20, "Tag cannot exceed 20 characters")
        .refine((value) => !containsProfanity(value), {
          message: "Tag contains profanity word",
        })
    )
    .min(1, "At least 1 tag is required"),
});

export const AnswerSchema = z.object({
  answer: z
    .string()
    .min(20, "Answer must be at least 20 characters long")
    .refine((value) => !containsProfanity(value), {
      message: "Answer contains profanity word",
    }),
});

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters long")
    .max(30, "Name cannot exceed 30 characters")
    .refine((value) => !containsProfanity(value), {
      message: "Name contains profanity word",
    }),
  username: z
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(25, "Username cannot exceed 25 characters")
    .refine((value) => !containsProfanity(value), {
      message: "Username contains profanity word",
    }),
  bio: z
    .string()
    .min(1, "Bio must be at least 1 character long")
    .max(150, "Bio cannot exceed 150 characters")
    .optional()
    .or(z.literal(""))
    .refine((value) => !containsProfanity(value), {
      message: "Bio contains profanity word",
    }),
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
    .or(z.literal(""))
    .refine((value) => !containsProfanity(value), {
      message: "Location contains profanity word",
    }),
});
