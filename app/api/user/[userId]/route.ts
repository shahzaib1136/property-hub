import User from "@/models/User";
import { createResponse, handleError } from "@lib/utils/response";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const { userId } = await params;

    const UserData = await User.findById(userId);

    if (!UserData) {
      return createResponse(false, undefined, "User Not Found", 404);
    }

    return createResponse(true, UserData, "user fetched successfully", 200);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching user detail:", error);

    // Sending error response
    return handleError(error);
  }
};
