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
      message:
        "The title might contain inappropriate language. Please contact our support team if you think this is a mistake.",
    }),
  explanation: z
    .string()
    .min(20, "Explanation must be at least 20 characters long")
    .refine((value) => !containsProfanity(value), {
      message:
        "The explanation might contain inappropriate language. Please contact our support team if you think this is a mistake.",
    }),
  tags: z
    .array(
      z
        .string()
        .min(1, "Tag must be at least 1 character long")
        .max(20, "Tag cannot exceed 20 characters")
        .refine((value) => !containsProfanity(value), {
          message:
            "The tag might contain inappropriate language. Please contact our support team if you think this is a mistake.",
        })
    )
    .min(1, "At least 1 tag is required"),
});

export const AnswerSchema = z.object({
  answer: z
    .string()
    .min(20, "Answer must be at least 20 characters long")
    .refine((value) => !containsProfanity(value), {
      message:
        "The answer might contain inappropriate language. Please contact our support team if you think this is a mistake.",
    }),
});

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters long")
    .max(30, "Name cannot exceed 30 characters")
    .refine((value) => !containsProfanity(value), {
      message:
        "The name might contain inappropriate language. Please contact our support team if you think this is a mistake.",
    }),
  username: z
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(25, "Username cannot exceed 25 characters")
    .refine((value) => !containsProfanity(value), {
      message:
        "The username might contain inappropriate language. Please contact our support team if you think this is a mistake.",
    }),
  bio: z
    .string()
    .min(1, "Bio must be at least 1 character long")
    .max(150, "Bio cannot exceed 150 characters")
    .optional()
    .or(z.literal(""))
    .refine((value) => !containsProfanity(value), {
      message:
        "The bio might contain inappropriate language. Please contact our support team if you think this is a mistake.",
    }),
  portfolioWebsite: z
    .string()
    .url("Invalid URL format")
    .optional()
    .or(z.literal(""))
    .refine((value) => !containsProfanity(value), {
      message:
        "The URL might contain inappropriate language. Please contact our support team if you think this is a mistake.",
    }),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters long")
    .max(100, "Location cannot exceed 100 characters")
    .optional()
    .or(z.literal(""))
    .refine((value) => !containsProfanity(value), {
      message:
        "The location might contain inappropriate language. Please contact our support team if you think this is a mistake.",
    }),
});
