import axiosApi from "@lib/utils/api";
import { MessageFormValues, MessageResponseType } from "@lib/types/messages";

async function PostPropertyMessage(values: MessageFormValues) {
  try {
    const res: { message: string; isBookmarked: boolean } = await axiosApi(
      `/messages`,
      "POST",
      values
    );

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Send message failed:", error);
      throw new Error(error.message); // Now passing a string message
    }
  }
}

async function fetchMessages() {
  try {
    const res: MessageResponseType[] = await axiosApi(`/messages`);

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("fetch messages failed:", error);
      throw new Error(error.message); // Now passing a string message
    }
  }
}

async function markAsReadMessages(id: string) {
  try {
    const res: MessageResponseType[] = await axiosApi(`/messages/${id}`, "PUT");

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("fetch messages failed:", error);
      throw new Error(error.message); // Now passing a string message
    }
  }
}

async function deleteMessageApi(id: string) {
  try {
    const res: MessageResponseType[] = await axiosApi(
      `/messages/${id}`,
      "DELETE"
    );

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("delete messages failed:", error);
      throw new Error(error.message); // Now passing a string message
    }
  }
}

export {
  PostPropertyMessage,
  fetchMessages,
  markAsReadMessages,
  deleteMessageApi,
};
