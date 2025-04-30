import connectDB from "@/config/database";
import Message from "@/models/Messages";
import { getUserSession } from "@lib/utils/getUserSession";
import { createResponse, handleError } from "@lib/utils/response";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // Make sure DB connection is established

    const body = await req.json();

    const session = await getUserSession();

    if (!session) {
      return handleError({
        message:
          "You need to be logged in to send a message. Please log in and try again.",
        status: 401,
      });
    }

    const { recipient, property, name, email, phone, message } = body;

    if (!recipient || !property || !name || !email || !message) {
      return handleError({ message: "Missing required fields", status: 400 });
    }

    if (session.userId === recipient) {
      return handleError({
        message: "Can not send a message to yourself",
        status: 400,
      });
    }

    const newMessage = await Message.create({
      sender: session.userId,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    return createResponse(true, newMessage, "Message sent successfully!", 200);
  } catch (error) {
    console.error("Error sending message:", error);
    return handleError(error as Error);
  }
}

export async function GET() {
  try {
    await connectDB(); // Make sure DB connection is established

    const session = await getUserSession();

    if (!session) {
      return handleError({
        message: "Please log in to view your messages.",
        status: 401,
      });
    }

    const newMessage = await Message.find({ recipient: session.userId })
      .populate("property", "name")
      .populate("sender", "username");

    return createResponse(true, newMessage, "Message fetch successfully!", 200);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return handleError(error as Error);
  }
}
