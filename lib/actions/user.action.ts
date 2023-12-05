/* eslint-disable no-unused-vars */
"use server";

import { FilterQuery } from "mongoose"; // a filter query is used to select the documents that match the query
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params; // pass the userId as parameters

    const user = await User.findOne({ clerkId: userId });
    // based on the userId we can find the user from the database using the User model
    // clerkId:userId means that we search the user by clerkId

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true }); // find the user based on the clerkId and passed the updated data and then create a new instance of the user in the database

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    // if user does not exist
    if (!user) {
      throw new Error("User not found");
    }

    // if the use exists,we have to delete the user from the database and also delete the questions,answers,comments,etc that have been made by the user

    // get user's question id
    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id"
    ); // distinct will return distinct values of the given field that matches the filter

    // deleting the questions made
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers,comments,etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter } = params; // set the page and pageSize value in case it does not exist

    const query: FilterQuery<typeof User> = {};

    // search user by name or username
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 }; // sort in descending order meaning newest user will be at top
        break;
      case "old_users":
        sortOptions = { joinedAt: 1 }; // sort in ascending order meaning newest user will be at bottom
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 }; // sort by reputation in descending order
        break;

      default:
        break;
    }

    const users = await User.find(query).sort(sortOptions);

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// this action is in user action because each user will have different saved question
export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } }, // remove the question from saved
        { new: true } // create new instance
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } }, // add the question from saved
        { new: true } // create new instance
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// this action is in user action because each user will have different saved question
export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();

    const { clerkId, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery // we always do it like this for searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const savedQuestions = user.saved; // extracting the user's saved question

    return { questions: savedQuestions }; // return question that is saved
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id }); // get the total question where the author is the user themselves
    const totalAnswers = await Answer.countDocuments({ author: user._id }); // get the total answer where the author is the user themselves

    return {
      user,
      totalQuestions,
      totalAnswers,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;

    // count the total questions asked by the user
    const totalQuestions = await Question.countDocuments({ author: userId });

    // display all of the questions asked by the user
    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 }) // sort the questions by the highest views and upvotes
      .populate("tags", "_id name") // populate the tags with id and name
      .populate("author", "_id clerkId name picture"); // populate the author with id,clerkId,name, and picture

    return { totalQuestions, questions: userQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;

    // count the total questions asked by the user
    const totalAnswers = await Answer.countDocuments({ author: userId });

    // display all of the questions asked by the user
    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 }) // sort the questions by the highest upvotes
      .populate("question", "_id title") // populate the question with id and title
      .populate("author", "_id clerkId name picture"); // populate the author with id,clerkId,name, and picture

    return { totalAnswers, answers: userAnswers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function getAllUsers(params:GetAllUsersParams){
//   try {
//     connectToDatabase();
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
