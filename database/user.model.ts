import { Schema, models, model, Document } from "mongoose";

// Schema.Types.ObjectId means a connection/reference to another model in the database since the tags will have its own model
// some will be an array because it will have high quantities and some dont
export interface IUser extends Document {
  clerkId: string; // because we have to make a connection between our clerk user and the user in the database
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true }, // unique username
  email: { type: String, required: true, unique: true }, // unique email
  password: { type: String },
  bio: { type: String },
  picture: { type: String, required: true },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: { type: Date, default: Date.now },
});

//turning the schema into a model
const User = models.User || model("User", UserSchema); // check if the model exist and if not it will create a User model based on the UserSchema

export default User;
