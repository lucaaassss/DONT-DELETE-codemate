"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Answer from "@/database/answer.model";
import { revalidatePath } from "next/cache";
import Interaction from "@/database/interaction.model";
import User from "@/database/user.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({ content, author, question });

    // add the answer to the question's answer array
    // question is used as a reference to where to push the answer
    const updatedQuestion = await Question.findByIdAndUpdate(
      question,
      {
        $push: { answers: newAnswer._id },
      },
      { new: true }
    );

    // create an Interaction record for the user's answer action
    await Interaction.create({
      user: author,
      action: "answer",
      question,
      answer: newAnswer._id,
      tags: updatedQuestion.tags,
    });

    // increment author's reputation by +10 for creating an answer
    await User.findByIdAndUpdate(author, { $inc: { reputation: 10 } });

    revalidatePath(path); // to automatically show the answer without having to reload the page
  } catch (error) {
    console.error("Error creating answer:", error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const {
      questionId,
      sortBy = "highestUpvotes",
      page = 1,
      pageSize = 5,
    } = params;

    // calculate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    let sortOptions = {};

    switch (sortBy) {
      case "highestUpvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "lowestUpvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 }; // sorted in alphabetical order
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        select: "_id clerkId name picture",
      }) // populate the author with id,clerkId,name and picture
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalAnswer = await Answer.countDocuments({ question: questionId }); // counting the answers for that specific question

    const isNextAnswer = totalAnswer > skipAmount + answers.length;

    return { answers, isNextAnswer };
  } catch (error) {
    console.error("Error fetching answers:", error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } }; // pull the specific userId  from the upvotes . Pull means that we dont want to do the action or we want to undo it
      // we dont want to upvote again since we already upvoted
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId }, // pull the specific userId  from the downvotes
        $addToSet: { upvotes: userId }, // add to set  the specific userId to the upvotes
        // we undo the downvote and then we upvoted
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }; // if we have not already upvoted or downvoted we will add a new upvote of the userId to the set
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    }); // passed in the questionId and the updateQuery and create a new instance

    if (!answer) {
      throw new Error("Answer not found");
    }

    // upvoting or undoing the upvote for other people's answer
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -2 : +2 },
    });

    // receiving upvote from other users
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasupVoted ? -2 : +2 },
    });

    revalidatePath(path);
  } catch (error) {
    console.error("Error upvoting answer:", error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } }; // pull the specific userId  from the downvotes . Pull means that we dont want to do the action or we want to undo it
      // we dont want to downvote again since we already downvoted
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId }, // pull the specific userId  from the upvotes
        $addToSet: { downvotes: userId }, // add to set the specific userId to the downvotes
        // we undo the upvote and then we downvoted
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } }; // if we have not already upvoted or downvoted we will add a new downvote of the userId to the set
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    }); // passed in the questionId and the updateQuery and create a new instance

    if (!answer) {
      throw new Error("Answer not found");
    }

    // increment author's reputation
    // downvoting or undoing the downvote for other people's answer
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? +2 : -2 },
    });

    // receiving downvote from other users
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasdownVoted ? +2 : -2 },
    });

    revalidatePath(path);
  } catch (error) {
    console.error("Error downvoting answer:", error);
    throw error;
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    await connectToDatabase();

    const { answerId, path } = params;

    // find the answer to be deleted
    const answer = await Answer.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    // delete the answer
    await Answer.deleteOne({ _id: answerId });

    // remove the answer reference from its question
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } }
    );

    // delete interactions related to the answer
    await Interaction.deleteMany({ answer: answerId });

    revalidatePath(path);
  } catch (error) {
    console.error("Error deleting answer:", error);
    throw error;
  }
}
