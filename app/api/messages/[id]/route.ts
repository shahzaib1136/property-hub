import connectDB from "@/config/database";
import Message from "@/models/Messages";
import { getUserSession } from "@lib/utils/getUserSession";
import { createResponse, handleError } from "@lib/utils/response";
import { NextRequest } from "next/server";

// PUT api/messages/:id
export async function PUT(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: messageId } = await params;

    await connectDB();
    const session = await getUserSession();

    if (!session) {
      return createResponse(false, null, "Unauthorized", 401);
    }

    const message = await Message.findById(messageId);

    if (!message) {
      return createResponse(false, null, "Message not found", 404);
    }

    if (message.recipient.toString() !== session.userId) {
      return createResponse(
        false,
        null,
        "Forbidden - You are not the recipient",
        403
      );
    }

    message.read = !message.read;
    await message.save();

    return createResponse(
      true,
      message,
      "Forbidden - You are not the recipient",
      200
    );
  } catch (error) {
    return handleError(error as Error);
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: messageId } = await params;

    await connectDB();
    const session = await getUserSession();

    if (!session) {
      return handleError({
        message: "Please log in to delete a message.",
        status: 401,
      });
    }

    if (!messageId) {
      return handleError({
        message: "Invalid or missing message ID.",
        status: 400,
      });
    }

    const deletedMessage = await Message.findOneAndDelete({
      _id: messageId,
      recipient: session?.userId, // Ensure user can only delete their own messages
    });

    if (!deletedMessage) {
      return handleError({
        message: "Message not found or not authorized to delete.",
        status: 404,
      });
    }

    return createResponse(
      true,
      deletedMessage,
      "Message deleted successfully.",
      200
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return handleError(error as Error);
  }
}
