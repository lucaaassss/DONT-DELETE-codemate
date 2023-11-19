"use server";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({}) // to find all question
      .populate({ path: "tags", model: Tag }) // if a specific question has tags attached to it,we want to populate all the values from the tags so that we can also display them at the question card.We do this because MongoDB does not show the name for the tag,it only show the reference.So to be able to get the name,we have to populate it
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 }); // to sort from newest question to oldest question (the newer question will be at the top)

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// we are dealing with asynchronous code so that's why we will have the try and catch block to handle if the call succeed or not
export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params; // accepting parameters from the front end (everyting we pass from our form).The path is going to be an URL to the page that we have to reload (the homepage) because we have to revalidate it so that next.js know something has change

    // create the question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // create the tags or get them if they already exist
    // findOneAndUpdate is a special mongoose property that has 2 parameters.We can add additional parameters if we want but essentially it has to be at least 2
    // it finds a document in the Tag collection that matches the specified conditions and updates it. If no document is found, it creates a new one
    // basically if the question created has a tag which already exist in the array it will add the question id to the tag and if not,it will create a new tag
    for (const tag of tags) {
      // looping over the tags array
      const existingTag = await Tag.findOneAndUpdate(
        // allows us find something (findOne)
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") }, // looks for a tag whose name matches the tag variable (case-insensitive)."regex" stands for regular expression and the "i" stands cor case-insensitive
        },
        // allows us to do something on it (Update)
        {
          $setOnInsert: { name: tag }, // if a document is being inserted (i.e., no matching document is found), this operation sets the name field to the current "tag"
          $push: { question: question._id }, // regardless of whether a document is found or inserted, it pushes the ID of a question (question._id) into the question array field of the document
        },
        // additional parameter
        {
          upsert: true, // if no document is found, create a new one based on the query criteria and update operations
          new: true, // return the modified document rather than the original one
        }
      );

      tagDocuments.push(existingTag._id); // after each operation, it pushes the _id of the tag (whether existing or newly created) into the tagDocuments array
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
      // after processing all tags, it updates the Question document with the ID question._id.
      // it pushes each element of the tagDocuments array into the tags array of the Question document.
      // the $each modifier is used to add multiple values to the array
      // after processing all tags, it updates the Question document by pushing all collected tag IDs into its tags array.
    });

    // create an interaction record for the user's ask_question action (to track who is the author of the question)

    // increment author's reputation by +5 for creating a question

    revalidatePath(path); // to remove the need to reload the homepage everytime a new question is added
  } catch (error) {}
}
