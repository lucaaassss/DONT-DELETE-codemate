import { Schema, models, model, Document } from "mongoose";

// TypeScript interface so that we always know which fields we have (TypeScript format)
export interface IQuestion extends Document {
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[]; // Schema.Types.ObjectId means a connection/reference to another model in the database since the tags will have its own model.Some will be an array because it will have high quantities and some dont
  views: number;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId[];
  createdAt: Date;
}

// schema or template (it is basically changing the TypeScript format to the Mongoose format)
const QuestionSchema = new Schema({
  // do pay attention to the bracket [] as it means that it will be an array
  title: { type: String, required: true }, // title is required
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }], // meaning that it will have a reference to the Tag model
  views: { type: Number, default: 0 }, // set the initial value of the views to 0
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  answer: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  createdAt: { type: Date, default: Date.now },
});

//turning the schema into a model
const Question = models.Question || model("Question", QuestionSchema); // check if the model exist and if not it will create a Question model based on the QuestionSchema

export default Question; // export the model
