import Property from "@/models/Property";
import connectDB from "@/config/database";
import { createResponse, handleError } from "@lib/utils/response";

export const GET = async () => {
  try {
    await connectDB();

    const properties = await Property.find({});

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
