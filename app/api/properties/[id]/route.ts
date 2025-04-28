import Property from "@/models/Property";
import connectDB from "@/config/database";
import { createResponse, handleError } from "@lib/utils/response";
import { NextRequest } from "next/server";
import { getUserSession } from "@lib/utils/getUserSession";

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

export const DELETE = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const session = await getUserSession();

    if (!session?.userID || !id) {
      return createResponse(
        false,
        null,
        "Property ID and User ID are required!",
        400
      );
    }

    if (!session) {
      return handleError({ message: "unauthorized", status: 404 });
    }

    await connectDB;

    const property = await Property.findOne({ _id: id, owner: session.userID });

    if (!property) {
      return createResponse(
        false,
        null,
        "Property not found or does not belong to user!",
        404
      );
    }

    //verify user ownership
    if (property.owner.toString() !== session.userID.toString()) {
      return createResponse(
        false,
        null,
        "Property does not belong to user!",
        404
      );
    }

    await Property.findByIdAndDelete(id);

    return createResponse(true, null, "Property deleted successfully", 200);
  } catch (error) {
    console.error("Error deleting property:", error);
    return handleError(error as Error);
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const awaitedParams = await params;
  const { id } = awaitedParams;

  try {
    const session = await getUserSession();

    if (!session?.userID || !id) {
      return createResponse(
        false,
        null,
        "Property ID and User ID are required!",
        400
      );
    }

    if (!session) {
      return handleError({ message: "Unauthorized", status: 401 });
    }

    await connectDB;

    const property = await Property.findOne({
      _id: id,
      owner: session.userID,
    });

    if (!property) {
      return createResponse(
        false,
        null,
        "Property not found or does not belong to user!",
        404
      );
    }

    // verify user ownership
    if (property.owner.toString() !== session.userID.toString()) {
      return createResponse(
        false,
        null,
        "Property does not belong to user!",
        403
      );
    }

    const data = await request.json();

    const updatedProperty = await Property.findByIdAndUpdate(id, data, {
      new: true, // return updated document
    });

    return createResponse(
      true,
      updatedProperty,
      "Property updated successfully",
      200
    );
  } catch (error) {
    console.error("Error updating property:", error);
    return handleError(error as Error);
  }
};
