"use server";

import { connectToDatabase } from "../mongoose";

// we are dealing with asynchronous code so that's why we will have the try and catch block to handle if the call succeed or not
export async function createQuestion(params: any) {
  try {
    connectToDatabase();
  } catch (error) {}
}
