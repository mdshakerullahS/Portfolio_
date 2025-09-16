"use client";

import { Trash, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/messages", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        const data = await res.json();
        setMessages(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, []);

  const deleteMessage = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/messages${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      setMessages((prev) => prev.filter((msg) => msg._id !== id));

      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[100vh]">
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div
          className={`${
            !isOpen && "lg:w-[50%]"
          } w-full max-h-[420px] flex flex-col rounded-md overflow-auto`}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedMessage(message);
                setIsOpen(true);
              }}
              className="px-4 py-2 bg-card border border-border rounded-md cursor-pointer"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{message.name}</h3>
                <p className="text-xs">
                  {new Date(message.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-base">{message.subject}</p>
            </div>
          ))}
        </div>
        <div
          className={`w-full ${
            !isOpen ? "hidden" : "flex flex-col"
          } bg-card border border-border rounded-md`}
        >
          {selectedMessage && (
            <div className="px-2 lg:px-4 py-2 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Link
                  href={`mailto:${selectedMessage.email}`}
                  className="font-semibold"
                >
                  {selectedMessage.email}
                </Link>
                <div className="flex items-center gap-1 px-0 lg:px-1">
                  <div
                    onClick={() => deleteMessage(selectedMessage._id)}
                    className="cursor-pointer"
                  >
                    <Trash size={16} color="red" />
                  </div>
                  <div
                    onClick={() => setIsOpen(false)}
                    className="rounded-md cursor-pointer"
                  >
                    <X size={18} />
                  </div>
                </div>
              </div>
              <hr />
              {selectedMessage.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
