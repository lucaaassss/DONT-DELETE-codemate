import { Schema, models, model, Document, Date } from "mongoose";

// Schema.Types.ObjectId means a connection/reference to another model in the database since the Interactions will have its own model
// some will be an array because it will have high quantities and some dont
export interface IInteraction extends Document {
  user: Schema.Types.ObjectId; // which user did the interaction
  action: string;
  question: Schema.Types.ObjectId[]; // user might have interact with question
  answer: Schema.Types.ObjectId[]; // user might have interact with answer
  tags: Schema.Types.ObjectId[]; // user might have interact with tag.Tag is an array because we can have multiple tags to each question or answer
  createdAt: Date; // when did the interaction happen
}

const InteractionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  createdAt: { type: Date, default: Date.now },
});

// turning the schema into a model
const Interaction =
  models.Interaction || model("Interaction", InteractionSchema); // check if the model exist and if not it will create a Interaction model based on the InteractionSchema

export default Interaction;
