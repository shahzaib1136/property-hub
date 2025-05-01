"use client";

import Spinner from "@/components/common/Spinner";
import { useState } from "react";
import { markAsReadMessages, deleteMessageApi } from "@lib/api/messages";
import Link from "next/link";
import { formatDate } from "@lib/utils/DateFormat";
import { toast } from "react-toastify";
import { ErrorType } from "@lib/utils/response";
import classNames from "classnames";
import { useAppContext } from "../context/AppContext";

const Messages = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    state: { messages },
    getMessages,
  } = useAppContext();

  const { loading, data: messagesData } = messages;

  const markAsReadMessage = async (id: string, status: boolean) => {
    try {
      setIsUpdating(true);

      await markAsReadMessages(id);
      await getMessages();

      toast.success(
        status ? "Marked as new successfully!" : "Marked as read successfully!"
      );
    } catch (err: unknown) {
      const error = err as ErrorType;
      toast.error(
        error?.message || "Something went wrong, please try again later"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      setIsUpdating(true);

      await deleteMessageApi(id);
      await getMessages();
      toast.success("Message deleted successfully!");
    } catch (err: unknown) {
      const error = err as ErrorType;
      toast.error(
        error?.message || "Something went wrong, please try again later"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading && !isUpdating) {
    return <Spinner loading={loading} />;
  }

  return (
    <section className="bg-blue-50">
      {isUpdating && <Spinner loading={true} overlay={true} />}
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          {messagesData.length === 0 ? (
            <p>
              No messages yet. Once someone contacts you about a property, their
              message will appear here.
            </p>
          ) : (
            messagesData.map((message) => (
              <div key={message.id} className="space-y-4">
                <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
                  {!message.read && (
                    <div className="absolute right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
                      New
                    </div>
                  )}

                  <h2 className="text-xl mb-4">
                    <span className="font-bold">Property Inquiry:</span>
                    {message.property.name}
                  </h2>
                  <p className="text-gray-700">{message.body}</p>

                  <ul className="mt-4">
                    <li>
                      <strong>Name:</strong>
                      {message.sender.username}
                    </li>

                    <li>
                      <strong>Reply Email:</strong>
                      <Link
                        href={`mailto:${message.email}`}
                        className="text-blue-500"
                      >
                        {message.email}
                      </Link>
                    </li>
                    <li>
                      <strong>Reply Phone:</strong>
                      <Link
                        href={`tel:${message.phone}`}
                        className="text-blue-500"
                      >
                        {message.phone}
                      </Link>
                    </li>
                    <li>
                      <strong>Received:</strong>
                      {formatDate(message.createdAt)}
                    </li>
                  </ul>
                  <button
                    className={classNames(
                      "mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md",
                      { "bg-gray-500": message.read }
                    )}
                    onClick={() => markAsReadMessage(message.id, message.read)}
                    disabled={isUpdating}
                  >
                    {message.read ? "Mark as new" : "Mark As Read"}
                  </button>
                  <button
                    className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
                    onClick={() => deleteMessage(message.id)}
                    disabled={isUpdating}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Messages;
