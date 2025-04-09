import Property from "@/models/Property";
import connectDB from "@/config/database";
import { createResponse, handleError } from "@lib/utils/response";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    // Await params to ensure it's resolved
    const { id } = await params;
    const property = await Property.findById(id);

    if (!property) {
      return createResponse(false, undefined, "Property Not Found", 404);
    }

    return createResponse(true, property, "Property fetched successfully", 200);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching property:", error);

    // Sending error response
    return handleError(error);
  }
};
