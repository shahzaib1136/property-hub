import Property from "@/models/Property";
import connectDB from "@/config/database";

export const GET = async (req: Request) => {
  try {
    // Log request information (optional)
    console.log("Request method:", req.method); // GET in this case
    console.log("Request URL:", req.url); // e.g., /api/properties

    await connectDB();

    const properties = await Property.find({});

    // Returning the response in the Web API standard
    return new Response(
      JSON.stringify({
        success: true,
        data: properties,
        message: "Properties fetched successfully",
      }),
      {
        status: 200,
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching properties:", error);

    // Sending error response
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Something went wrong",
      }),
      {
        status: 500,
      }
    );
  }
};
