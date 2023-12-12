"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, userId } = params;

    // get the question and its tags
    const question = await Question.findById(questionId);

    if (!question) {
      console.log("Question not found");
      return;
    }

    // update view count for the question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } }); // passed in the questionId and increment the views by 1

    // to check if the user already viewed the specific question
    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) {
        console.log("User has already viewed this question");
        return;
      }

      // if there is no existing interaction,we will create the interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
        tags: question.tags,
      });
    }
  } catch (error) {
    console.error("Error viewing question:", error);
    throw error;
  }
}
