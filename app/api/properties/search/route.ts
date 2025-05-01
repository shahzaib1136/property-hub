import connectDB from "@/config/database";
import Property from "@/models/Property";
import { createResponse, handleError } from "@lib/utils/response";
import { parseQueryString } from "@lib/utils/searchParams";
import { NextRequest } from "next/server";

type PropertyFilter = {
  type?: string;
  $or?: { [key: string]: RegExp }[];
};

export const GET = async (request: NextRequest) => {
  const { search } = new URL(request.url); // extract search string, e.g., "?type=House&location=Berlin"

  const { location, propertyType } = parseQueryString(search);

  const locationPattern = new RegExp(location, "i");

  try {
    await connectDB();

    const filters: PropertyFilter = {};

    if (propertyType && typeof propertyType === "string") {
      filters.type = propertyType;
    }

    if (location && typeof location === "string") {
      filters.$or = [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ];
    }

    const properties = await Property.find(filters).lean();

    return createResponse(
      true,
      properties,
      "Properties fetched successfully",
      200
    );
  } catch (error: unknown) {
    console.error("Error fetching properties:", error);

    return handleError(error as Error);
  }
};
