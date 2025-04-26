import Property from "@/models/Property";
import connectDB from "@/config/database";
import { createResponse, handleError } from "@lib/utils/response";
import { NextRequest } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const { userId } = params;

  if (!userId) {
    return createResponse(false, null, "User ID is required!", 404);
  }

  try {
    await connectDB();

    const properties = await Property.find({ owner: userId });

    return createResponse(
      true,
      properties,
      "Properties fetched successfully",
      200
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching properties:", error);

    return handleError(error);
  }
};
