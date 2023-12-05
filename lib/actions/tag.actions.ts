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

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    // find interactions for the user and group by tags
    // interactions..

    return [
      { _id: "1", name: "NEXT.JS" },
      { _id: "2", name: "REACT" },
      { _id: "3", name: "CSS" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
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

    const tags = await Tag.find(query).sort(sortOptions);

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    // const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const { tagId, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } } // pass the searchQuery as the title and set it so it is case insensitive
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.questions; // return question according to the tag

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();

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
    console.log(error);
    throw error;
  }
}
