"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";
import Interaction from "@/database/interaction.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId, limit = 3 } = params;

    // find the user by clerkId
    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    // find interactions for the user and group by tags
    const tagCountMap = await Interaction.aggregate([
      { $match: { user: user._id, tags: { $exists: true, $ne: [] } } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);

    const topTags = tagCountMap.map((tagCount) => tagCount._id);

    // find the tag documents for the top tags
    const topTagDocuments = await Tag.find({ _id: { $in: topTags } });

    return topTagDocuments;
  } catch (error) {
    console.log("Error fetching top interacted tags:", error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 6 } = params;
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions: any = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: 1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "name":
        sortOptions = { name: 1 }; // sorted in alphabetical order
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }

    // modify the query to include tags with non-empty questions array
    query.questions = { $exists: true, $not: { $size: 0 } };

    const totalTags = await Tag.countDocuments(query);

    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase();

    const { tagId, page = 1, pageSize = 3, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;

    // create a filter for the tag by ID
    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    // find the tag by ID and populate the questions field
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } } // pass the searchQuery as the title and set it so it is case insensitive
        : {},
      options: {
        skip: skipAmount,
        limit: pageSize + 1, // +1 to check if there is a next page
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" }, // populate the tags field of questions
        { path: "author", model: User, select: "_id clerkId name picture" }, // populate the author field of questions
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.questions; // return question according to the tag

    const isNext = tag.questions.length > pageSize; // calculate the isNext indicator

    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    console.error("Error fetching questions by tag ID:", error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    await connectToDatabase();

    // use the aggregate function to perform aggregation operations on the Tag collection
    // aggregation is a technique used to analyse complex data.In this case we want to analyse the Tag to find how many questions are related to that tag
    // aggregation in MongoDB is a powerful framework for processing and transforming documents in the collection. It allows you to perform various operations, such as filtering, grouping, sorting, and projecting, on the documents.
    // project only the 'name' and calculate the 'numberOfQuestions'
    // the $project stage is used to shape the documents in the pipeline.It can be used to include,exclude,or reshape fields in the output documents
    // here, we include 'name' as it is, which means we include it in the output document without any changes
    // it is included because we want to display the 'name' field in the final result
    // additionally, we calculate 'numberOfQuestions' by counting the elements in the 'questions' array
    const popularTags = await Tag.aggregate([
      // call the aggregate function and pass pipeline.Pipeline is a term in MongoDB and other databases to describe a framework for data transformation through a series of processing stages
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } }, // sort the results in descending order based on the 'numberOfQuestions'
      { $limit: 5 }, // limit the result set to the top 5 tags
    ]);

    return popularTags;
  } catch (error) {
    console.error("Error fetching top popular tags:", error);
    throw error;
  }
}
