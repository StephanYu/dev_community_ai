"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopTagsParams } from "./shared.types";

export async function getTopTags(params: GetTopTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    // Find interactions for the user and group by tags...
    // Interaction...

    return [
      { _id: "1", name: "nextjs" },
      { _id: "2", name: "react" },
      { _id: "3", name: "typescript" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
