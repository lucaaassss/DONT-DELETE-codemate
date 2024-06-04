<div align="center">
  
  
  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb" />
  </div>

  <h3 align="center">A Programming Community Forum Application</h3>

  
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Code Snippets to Copy](#snippets)


## <a name="introduction">🤖 Introduction</a>

Built with Next.js, Codemate is a web community forum specifically designed for programming students.  The platform integrates cutting-edge Artificial Intelligence (AI) through the ChatGPT API to provide intelligent responses to user queries and enhance the accuracy of tag descriptions. Additionally, it leverages Component-Based Software Engineering (CBSE) principles to seamlessly integrate various third-party services, creating a cohesive and user-friendly experience for student programmers.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- Tailwind CSS
- ShadCN
- React Hook Form
- Zod
- Clerk
- ChatGPT API
- EmailJS
- TinyMCE
- MongoDB
- Vercel

## <a name="features">🔋 Features</a>

👉 **Authentication**: An ultra-secure Clerk service authentication.

👉 **Home Page**: Shows all of the questions posted along with search, filter, and pagination functionality.

👉 **Ask a Question**: Allows user to post questions using the React Hook Form and TinyMCE editor for code snippet.

👉 **Question Details**: Shows the details for each question along with AI-generated answer functionality.

👉 **Tags**: Shows all of the questions for each tag along with AI-generated tag description functionality.

👉 **Collections**: Shows all of the saved questions.

👉 **Community**: Shows all of the users that are using the platform along with their top tags.

👉 **Profile**: Shows the details for each user along with their achievements.

👉 **Support**: Allows user to message the Codemate team via EmailJS service.


and many more, including code architecture and reusability. 

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/shahirulprojects/Codemate.git
cd Codemate
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env.local

#CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_CLERK_WEBHOOK_SECRET=

#TINYMCE
NEXT_PUBLIC_TINY_EDITOR_API_KEY=

#MONGODB
MONGODB_URL=

#OPENAI
OPENAI_API_KEY=

#EMAILJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=

NEXT_PUBLIC_SERVER_URL=http://localhost:3000

```

Replace the placeholder values with your actual respective account credentials. You can obtain these credentials by signing up on the [Clerk](https://clerk.com/), [TinyMCE](https://www.tiny.cloud/) , [MongoDB](https://www.mongodb.com/), [OpenAI](https://platform.openai.com/playground), and [EmailJS](https://www.emailjs.com/)

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>.env.local</code></summary>

```env
#CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_CLERK_WEBHOOK_SECRET=

#TINYMCE
NEXT_PUBLIC_TINY_EDITOR_API_KEY=

#MONGODB
MONGODB_URL=

#OPENAI
OPENAI_API_KEY=

#EMAILJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=

NEXT_PUBLIC_SERVER_URL=http://localhost:3000

```

</details>

<details>
<summary><code>user.action.ts</code></summary>

```user.action
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
import { BadgeCriteriaType } from "@/types";
import { assignBadges } from "../utils";
import Interaction from "@/database/interaction.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params; // pass the userId as parameters

    const user = await User.findOne({ clerkId: userId });
    // based on the userId we can find the user from the database using the User model
    // clerkId:userId means that we search the user by clerkId

    return user;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
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
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId });

    // if user does not exist
    if (!user) {
      throw new Error("User not found");
    }

    // get user's question id
    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id"
    ); // distinct will return distinct values of the given field that matches the filter

    // if the user exists,we have to delete the user from the database and also delete the questions,answers,comments,etc that have been made by the user

    // deleting all questions asked by the user
    await Question.deleteMany({ author: user._id });

    // delete all answers given by the user
    await Answer.deleteMany({ author: user._id });

    // delete the answers created by other users on questions created by the user
    await Answer.deleteMany({ question: { $in: userQuestionIds } });

    // remove user reference from upvotes and downvotes on questions
    await Question.updateMany(
      { upvotes: user._id },
      { $pull: { upvotes: user._id } }
    );

    await Question.updateMany(
      { downvotes: user._id },
      { $pull: { downvotes: user._id } }
    );

    // remove user reference from upvotes and downvotes on answers
    await Answer.updateMany(
      { upvotes: user._id },
      { $pull: { upvotes: user._id } }
    );

    await Answer.updateMany(
      { downvotes: user._id },
      { $pull: { downvotes: user._id } }
    );

    // delete interactions involving the user
    await Interaction.deleteMany({ user: user._id });

    // update tags to remove references to the user's questions
    await Tag.updateMany(
      { questions: { $in: userQuestionIds } },
      { $pull: { questions: { $in: userQuestionIds } } }
    );

    // delete the user
    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 6 } = params;
    const skipAmount = (page - 1) * pageSize;

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
      case "new_users": // refer filter.ts file for the variable name
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

    const users = await User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsers = await User.countDocuments(query);

    const isNext = totalUsers > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// this action is in user action because each user will have different saved question
export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    await connectToDatabase();

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
    console.error("Error toggling saved question:", error);
    throw error;
  }
}

// this action is in user action because each user will have different saved question
export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    await connectToDatabase();

    const { clerkId, searchQuery, filter, page = 1, pageSize = 3 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = searchQuery // we always do it like this for searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    let sortOptions = {};

    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most_voted":
        sortOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: -1 };
        break;
      case "most_answered":
        sortOptions = { answers: -1 };
        break;

      default:
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const savedQuestions = user.saved.slice(0, pageSize); // extracting the user's saved question

    const isNext = user.saved.length > pageSize; // to find out if the total number of saved questions is greater than page size

    return { questions: savedQuestions, isNext }; // return question that is saved
  } catch (error) {
    console.error("Error fetching saved questions:", error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    await connectToDatabase();

    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id }); // get the total question where the author is the user themselves
    const totalAnswers = await Answer.countDocuments({ author: user._id }); // get the total answer where the author is the user themselves

    const [questionUpvotes] = await Question.aggregate([
      { $match: { author: user._id } }, // find the questions author that matches the user id
      {
        $project: {
          _id: 0,
          upvotes: { $size: "$upvotes" }, // get the number of upvotes for each question
        },
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" }, // sum all of the upvotes
        },
      },
    ]);

    const [answerUpvotes] = await Answer.aggregate([
      { $match: { author: user._id } }, // find the answers author that matches the user id
      {
        $project: {
          _id: 0,
          upvotes: { $size: "$upvotes" }, // get the number of upvotes for each answer
        },
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" }, // sum all of the upvotes
        },
      },
    ]);

    const [questionViews] = await Question.aggregate([
      { $match: { author: user._id } },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$views" },
        },
      },
    ]);

    const criteria = [
      { type: "QUESTION_COUNT" as BadgeCriteriaType, count: totalQuestions },
      { type: "ANSWER_COUNT" as BadgeCriteriaType, count: totalAnswers },
      {
        type: "QUESTION_UPVOTES" as BadgeCriteriaType,
        count: questionUpvotes?.totalUpvotes || 0,
      },
      {
        type: "ANSWER_UPVOTES" as BadgeCriteriaType,
        count: answerUpvotes?.totalUpvotes || 0,
      },
      {
        type: "TOTAL_VIEWS" as BadgeCriteriaType,
        count: questionViews?.totalViews || 0,
      },
    ];

    const badgeCounts = assignBadges({ criteria });

    return {
      user,
      totalQuestions,
      totalAnswers,
      badgeCounts,
      reputation: user.reputation,
    };
  } catch (error) {
    console.error("Error getting user info:", error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    await connectToDatabase();

    const { userId, page = 1, pageSize = 3 } = params;

    const skipAmount = (page - 1) * pageSize;

    // count the total questions asked by the user
    const totalQuestions = await Question.countDocuments({ author: userId });

    // display all of the questions asked by the user
    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 }) // sort the questions by highest views and upvotes
      .skip(skipAmount)
      .limit(pageSize)
      .populate("tags", "_id name") // populate the tags with id and name
      .populate("author", "_id clerkId name picture"); // populate the author with id,clerkId,name, and picture

    const isNextQuestions = totalQuestions > skipAmount + userQuestions.length;

    return { totalQuestions, questions: userQuestions, isNextQuestions };
  } catch (error) {
    console.error("Error fetching user questions:", error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    await connectToDatabase();

    const { userId, page = 1, pageSize = 3 } = params;

    const skipAmount = (page - 1) * pageSize;

    // count the total answers asked by the user
    const totalAnswers = await Answer.countDocuments({ author: userId });

    // display all of the answers asked by the user
    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 }) // sort the answers by the highest upvotes
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "question",
        select: "_id title",
      }) // populate the question with id and title
      .populate("author", "_id clerkId name picture"); // populate the author with id,clerkId,name, and picture

    const isNextAnswer = totalAnswers > skipAmount + userAnswers.length;

    return { totalAnswers, answers: userAnswers, isNextAnswer };
  } catch (error) {
    console.error("Error fetching user answers:", error);
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


```

</details>

<details>
<summary><code>question.action.ts</code></summary>

```question.action
"use server";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
  RecommendedParams,
} from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import { FilterQuery } from "mongoose";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 3 } = params; // searchQuesry is from (home)>page.tsx

    // calculate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize; // for example if we are at page 2, it will be 2-1 and then times 20 meaning that we want to skip the first twenty and only see the rest of it

    const query: FilterQuery<typeof Question> = {}; // how to read: query of a type FilterQuery and we are filtering something that are a type of Question. {} means that our query at the start is just an empty object

    // if a search query is provided, filter questions by title or content
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } }, // if the content contains the keyword of the search we will also display it
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 }; // sort by the latest questions asked
        break;
      case "frequent":
        sortOptions = { views: -1 }; // sort by the highest question view since user frequently see that question
        break;
      case "unanswered":
        query.answers = { $size: 0 }; // sort by questions that has 0 answers
        break;

      default:
        break;
    }
    const questions = await Question.find(query) // to find question
      .populate({ path: "tags", model: Tag }) // if a specific question has tags attached to it,we want to populate all the values from the tags so that we can also display them at the question card.We do this because MongoDB does not show the name for the tag,it only show the reference.So to be able to get the name,we have to populate it
      .populate({ path: "author", model: User })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions); // to sort from newest question to oldest question (the newer question will be at the top)

    // figuring out if the next page exist or not

    const totalQuestions = await Question.countDocuments(query);

    const isNext = totalQuestions > skipAmount + questions.length;
    // skipAmount is the number of questions we already skipped / seen
    // questions.length represents the number of questions of the current page we are at
    // for example if we have 101 total questions and the skipped amount is currently 4 pages with the pageSize value of 5 and the current page that we are at contains 5 questions
    // so the total would be 25, meaning that 101>25 therefore we will still have next pages
    return { questions, isNext };
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}

// we are dealing with asynchronous code so that's why we will have the try and catch block to handle if the call succeed or not
export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;
    // destructuring the params
    // accepting parameters from the front end (everything we pass from our form).The path is going to be an URL to the page that we have to reload (the homepage) because we have to revalidate it so that next.js know something has change

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
          name: { $regex: new RegExp(`^${tag}$`, "i") }, // looks for a tag whose name matches the tag variable (case-insensitive)."regex" stands for regular expression and the "i" stands for case-insensitive
        },
        // allows us to do something on it (Update)
        {
          $setOnInsert: { name: tag }, // if a document is being inserted (i.e., no matching document is found), this operation sets the name field to the current "tag"
          $push: { questions: question._id }, // regardless of whether a document is found or inserted, it pushes the ID of a question (question._id) into the question array field of the document
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
    await Interaction.create({
      user: author,
      action: "ask_question",
      question: question._id,
      tags: tagDocuments,
    });

    // increment author's reputation by +5 for creating a question
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } }); // pass in the authpr and update their reputation by 5 points

    revalidatePath(path); // to remove the need to reload the homepage everytime a new question is added
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      }) // selecting the id and the name
      .populate({
        path: "author",
        model: User,
        select: "id_ clerkId name picture",
      }); // selecting only the id,clerkId,name,picture

    return question;
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    throw error;
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } }; // pull the specific userId  from the upvotes . Pull means that we dont want to do the action or we want to undo it
      // we dont want to upvote again since we already upvoted
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId }, // pull the specific userId  from the downvotes
        $addToSet: { upvotes: userId }, // push  the specific userId to the upvotes
        // we undo the downvote and then we upvoted
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }; // if we have not already upvoted or downvoted we will add a new upvote of the userId to the set
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    }); // passed in the questionId and the updateQuery and create a new instance

    if (!question) {
      throw new Error("Question not found");
    }

    // increment author's reputation by +1 for upvoting a question and -1 for undoing the upvote
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -1 : +1 },
    });

    // increment author's reputation by +10 for receiving an upvote to the question they created or -10 for receiving a downvote for the question they created
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasupVoted ? -10 : +10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.error("Error upvoting question:", error);
    throw error;
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } }; // pull the specific userId  from the downvotes . Pull means that we dont want to do the action or we want to undo it
      // we dont want to downvote again since we already downvoted
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId }, // pull the specific userId  from the upvotes
        $addToSet: { downvotes: userId }, // push  the specific userId to the downvotes
        // we undo the upvote and then we downvoted
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } }; // if we have not already upvoted or downvoted we will add a new downvote of the userId to the set
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    }); // passed in the questionId and the updateQuery and create a new instance

    if (!question) {
      throw new Error("Question not found");
    }

    // increment author's reputation
    // downvoting or undoing the downvote for other people's answer
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? +1 : -1 },
    });

    // receiving downvote from other users
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasdownVoted ? +10 : -10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.error("Error downvoting question:", error);
    throw error;
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId }); // delete the question
    await Answer.deleteMany({ question: questionId }); // delete all answers associated with the question
    await Interaction.deleteMany({ question: questionId }); // delete all interaction associated with the question
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    ); // remove the reference to this question from all of the tags

    revalidatePath(path);
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, title, content, tags, path } = params;

    const question = await Question.findById(questionId).populate("tags"); // find the question that has to be updated

    if (!question) {
      throw new Error("Question not found");
    }

    // update question fields
    question.title = title; // update the title
    question.content = content; // update the content

    await question.save();

    const newTags = tags.map((tag: string) => tag.toUpperCase());
    const existingTags = question.tags.map((tag: any) =>
      tag.name.toUpperCase()
    );

    const tagUpdates = {
      tagsToAdd: [] as string[],
      tagsToRemove: [] as string[],
    };

    for (const tag of newTags) {
      if (!existingTags.includes(tag.toUpperCase())) {
        tagUpdates.tagsToAdd.push(tag);
      }
    }

    for (const tag of question.tags) {
      if (!newTags.includes(tag.name.toUpperCase())) {
        tagUpdates.tagsToRemove.push(tag._id);
      }
    }

    // add new tags and link them to the question
    const newTagDocuments = [];

    for (const tag of tagUpdates.tagsToAdd) {
      const newTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      newTagDocuments.push(newTag._id);
    }

    console.log({ tagUpdates });

    // remove question reference for tagsToRemove from the tag
    if (tagUpdates.tagsToRemove.length > 0) {
      await Tag.updateMany(
        { _id: { $in: tagUpdates.tagsToRemove } },
        { $pull: { questions: question._id } }
      );
    }

    if (tagUpdates.tagsToRemove.length > 0) {
      await Question.findByIdAndUpdate(question._id, {
        $pull: { tags: { $in: tagUpdates.tagsToRemove } },
      });
    }

    if (newTagDocuments.length > 0) {
      await Question.findByIdAndUpdate(question._id, {
        $push: { tags: { $each: newTagDocuments } },
      });
    }

    revalidatePath(path);
  } catch (error) {
    console.error("Error editing question:", error);
    throw error;
  }
}

export async function getHotQuestions() {
  // this function does not need a param since our question already has views and upvotes which we can make use of
  try {
    await connectToDatabase();

    const hotQuestions = await Question.find({}) // once it connect to the database we will find question and sort it according to views and upvotes
      .sort({ views: -1, upvotes: -1 }) // will sort in a descending order meaning that the hottest questions will be at the top
      .limit(5); // will only show top 5 hot questions

    return hotQuestions;
  } catch (error) {
    console.error("Error fetching hot questions:", error);
    throw error;
  }
}

export async function getRecommendedQuestions(params: RecommendedParams) {
  try {
    await connectToDatabase();

    const { userId, page = 1, pageSize = 20, searchQuery } = params;

    // find user
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("user not found");
    }

    const skipAmount = (page - 1) * pageSize;

    // find the user's interactions to see what tags they have been following
    const userInteractions = await Interaction.find({ user: user._id })
      .populate("tags")
      .exec();

    // extract tags from user's interactions
    const userTags = userInteractions.reduce((tags, interaction) => {
      if (interaction.tags) {
        tags = tags.concat(interaction.tags);
      }
      return tags;
    }, []);

    // get distinct tag IDs from user's interactions
    const distinctUserTagIds = [
      // @ts-ignore
      ...new Set(userTags.map((tag: any) => tag._id)),
    ];

    const query: FilterQuery<typeof Question> = {
      $and: [
        { tags: { $in: distinctUserTagIds } }, // questions with user's tags
        { author: { $ne: user._id } }, // exclude user's own questions so that user wont see their own questions at the recommendation
      ],
    };

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];
    }

    const totalQuestions = await Question.countDocuments(query);

    const recommendedQuestions = await Question.find(query)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .skip(skipAmount)
      .limit(pageSize);

    const isNext = totalQuestions > skipAmount + recommendedQuestions.length;

    return { questions: recommendedQuestions, isNext };
  } catch (error) {
    console.error("Error getting recommended questions:", error);
    throw error;
  }
}

```

</details>

<details>
<summary><code>answer.action.ts</code></summary>

```answer.action
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

```

</details>


#
