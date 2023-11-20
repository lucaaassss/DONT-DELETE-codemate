"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

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
