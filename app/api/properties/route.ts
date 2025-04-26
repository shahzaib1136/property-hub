import Property from "@/models/Property";
import connectDB from "@/config/database";
import { createResponse, handleError } from "@lib/utils/response";
import { NextRequest } from "next/server";
import { getUserSession } from "@lib/utils/getUserSession";
import cloudinary from "@/config/cloudinary";
import { getInt, getNumber, getObject, getString } from "@lib/utils";
import { Property as PropertyTypes } from "@lib/types/property";
import { decamelizeKeys } from "humps";

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

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const session = await getUserSession();

    if (!session) {
      return handleError({ message: "unauthorized", status: 404 });
    }

    const formData = await request.formData();

    // Extract all fields from formData
    const name = getString(formData, "name");
    const type = getString(formData, "type");
    const description = getString(formData, "description");
    const location = getObject(formData, "location");
    const beds = getInt(formData, "beds");
    const baths = getInt(formData, "baths");
    const squareFeet = getInt(formData, "squareFeet");
    const amenities = formData.getAll("amenities") as string[];

    const rates = {
      weekly: getNumber(formData, "rates.weekly"),
      monthly: getNumber(formData, "rates.monthly"),
      nightly: getNumber(formData, "rates.nightly"),
    };

    const sellerInfo = {
      name: getString(formData, "sellerInfo.name"),
      email: getString(formData, "sellerInfo.email"),
      phone: getString(formData, "sellerInfo.phone"),
    };

    const data: Partial<PropertyTypes> = {
      name,
      type,
      description,
      location,
      beds,
      baths,
      squareFeet,
      amenities,
      rates,
      sellerInfo,
      owner: session.userID,
    };

    // Handle images
    const imageFiles = formData.getAll("images") as File[];

    const imageUploadPromises = imageFiles.map(async (image) => {
      if (image.size > 0) {
        // Check if it's a real file
        const imageBuffer = await image.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);
        const imageBase64 = imageData.toString("base64");

        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${imageBase64}`,
          { folder: "propertyHub" }
        );

        return result.secure_url;
      }
      return null;
    });

    const uploadedImages = (await Promise.all(imageUploadPromises)).filter(
      (url) => url !== null
    );

    data.images = uploadedImages;

    // Connect to the database
    await connectDB();

    const newProperty = new Property(decamelizeKeys(data));
    await newProperty.save();

    // Send success response
    return createResponse(
      true,
      newProperty,
      "Property added successfully!",
      200
    );
  } catch (error: unknown) {
    console.error("Failed to add property", error);

    return handleError(error as Error);
  }
};
