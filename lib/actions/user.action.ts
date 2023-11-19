"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

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
