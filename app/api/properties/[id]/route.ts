import Property from "@/models/Property";
import connectDB from "@/config/database";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // Log request information (optional)
    console.log("Request method:", req.method); // GET in this case
    console.log("Request URL:", req.url); // e.g., /api/properties

    await connectDB();

    // Await params to ensure it's resolved
    const { id } = await params;
    const property = await Property.findById(id);

    if (!property) {
      return new Response(
        JSON.stringify({
          success: false,
          data: undefined,
          message: "Property Not Found",
        }),
        {
          status: 404,
        }
      );
    }

    // Returning the response in the Web API standard
    return new Response(
      JSON.stringify({
        success: true,
        data: property,
        message: "Property fetched successfully",
      }),
      {
        status: 200,
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching property:", error);

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
