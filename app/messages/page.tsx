"use client";

import Spinner from "@/components/common/Spinner";
import { useEffect, useState } from "react";
import { fetchMessages } from "@lib/api/messages";
import { MessageResponseType } from "@lib/types/messages";
import Link from "next/link";
import { formatDate } from "@lib/utils/DateFormat";

const Messages = () => {
  const [messages, setMessages] = useState<MessageResponseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setIsLoading(true);

        const messages = (await fetchMessages()) || [];
        setMessages(messages);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getMessages();
  }, []);

  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          {messages.length === 0 ? (
            <p>
              No messages yet. Once someone contacts you about a property, their
              message will appear here.
            </p>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="space-y-4">
                <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
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
                  <button className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md">
                    Mark As Read
                  </button>
                  <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
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
