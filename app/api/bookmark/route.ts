import { createResponse, handleError } from "@lib/utils/response";
import { NextRequest } from "next/server";
import { getUserSession } from "@lib/utils/getUserSession";
import User from "@/models/User";
import Property from "@/models/Property";

export const dynamic = "force-dynamic";

export const PUT = async (request: NextRequest) => {
  try {
    const { id: propertyId } = await request.json();
    const session = await getUserSession();

    if (!session?.userId || !propertyId) {
      return createResponse(
        false,
        null,
        "Authentication required. Please log in to perform this action.",
        401
      );
    }

    const user = await User.findOne({ _id: session.userId });

    let isBookmarked = user.bookmarks.includes(propertyId);

    let message = "";

    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully!";
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully!";
      isBookmarked = true;
    }

    await user.save();

    return createResponse(true, { isBookmarked, message }, message, 200);
  } catch (error) {
    console.error("Error updating bookmarks:", error);
    return handleError(error as Error);
  }
};

export const GET = async () => {
  try {
    const { userId } = (await getUserSession()) || {};

    if (!userId) {
      return createResponse(
        false,
        undefined,
        "You need to be login first",
        401
      );
    }

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return createResponse(false, undefined, "User not found", 404);
    }

    // If no bookmarks, return empty
    if (!user.bookmarks || user.bookmarks.length === 0) {
      return createResponse(true, [], "No saved properties", 200);
    }

    // Fetch all properties by bookmarked IDs
    const savedProperties = await Property.find({
      _id: { $in: user.bookmarks },
    });

    return createResponse(
      true,
      savedProperties,
      "Saved properties fetched successfully",
      200
    );
  } catch (error) {
    console.error("Error fetching saved properties:", error);
    return handleError(error as Error);
  }
};
