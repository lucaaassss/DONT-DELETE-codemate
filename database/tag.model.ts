import { Schema, models, model, Document } from "mongoose";

// Schema.Types.ObjectId means a connection/reference to another model in the database since the tags will have its own model
// some will be an array because it will have high quantities and some dont
export interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  Followers: Schema.Types.ObjectId[]; // allow us to follow a specific tag
  createdOn: Date;
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: Date.now },
});

// turning the schema into a model
const Tag = models.Tag || model("Tag", TagSchema); // check if the model exist and if not it will create a Tag model based on the TagSchema

export default Tag;
