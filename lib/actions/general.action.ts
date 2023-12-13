"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";

const SearchableTypes = ["question", "answer", "user", "tag"]; // types that can be searched

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndTypes = [
      // we group it like this because if not, we have to call one by one when searching so it is not efficient.This method is called an abstraction
      { model: Question, searchField: "title", type: "question" }, // finding the Question model and search based on its title
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const typeLower = type?.toLowerCase();
    // if type exists, lowercase it
    // sometimes type are written in uppercase so we want to lowercase it

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // if typeLower does not exist or if searchable types does not include typeLower.In simple words if the filter of the search box is not turned on
      // search across everything

      for (const { model, searchField, type } of modelsAndTypes) {
        // destructure the properties of modelsAndTypes
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2); // because we will display 2 results from each types so the 4x2 is 8

        results.push(
          ...queryResults.map((item) => ({
            // spread the queryResults and map its item
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                  ? item.question
                  : item._id, // if the type is user,return clerkId.If else the type is answer,return question since it contain the id of the item.Else,return item id.This just has to do on how we store id in different properties that we have
          }))
        );
      }
    } else {
      // search in the specified model type (meaning that the searchbox filter is turned on)
      const modelInfo = modelsAndTypes.find((item) => item.type === type); // get an item and that item type must be equal to the type we are searching for

      if (!modelInfo) {
        // if the type is not question,answer,user,tag
        throw new Error("Invalid search type");
      }

      const queryResults = await modelInfo.model // get the type of model that the user search for
        .find({ [modelInfo.searchField]: regexQuery }) // modelInfo.searchField represents what is the model can be searched on and the regexQuery represents the query that the user inserted.For example,if the model is User,then the modelInfo.searchField will be "name" and the regexQuery will be the name that the user wants to search
        .limit(8); // show only maximum of 8 results

      results = queryResults.map((item) => ({
        // return each item object
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkid
            : type === "answer"
              ? item.question
              : item._id, // if the type is user,return clerkId.If else the type is answer,return question since it contain the id of the item.Else,return item id.This just has to do on how we store id in different properties that we have
      }));
    }

    return JSON.stringify(results);
  } catch (error: any) {
    console.error("Error fetching search results:", error.message);
    throw error;
  }
}
