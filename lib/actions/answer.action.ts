"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Answer from "@/database/answer.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({ content, author, question });

    // add the answer to the question's answer array
    await Question.findByIdAndUpdate(question, {
      // question is used as a reference to where to push the answer
      $push: { answers: newAnswer._id },
    });
    // TODO:Add interaction

    revalidatePath(path); // to automatically show the answer without having to reload the page
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture") // populate the author with id,clerkId,name and picture
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
