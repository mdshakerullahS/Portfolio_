"use client";

import { useData } from "@/app/context/Context";
import { Edit, Trash, X } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState();
  const { feedbacks, setFeedbacks } = useData();

  const deleteFeedback = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/feedbacks/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      setFeedbacks((prev) => prev.filter((feed) => feed._id !== id));

      if (selectedFeedback && selectedFeedback._id === id) {
        setSelectedFeedback(null);
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
          } w-full max-h-[420px] flex flex-col bg-card border border-border rounded-md overflow-hidden`}
        >
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              onClick={() => {
                setSelectedFeedback(feedback);
                setIsOpen(true);
              }}
              className="px-4 py-2 bg-card border border-border rounded-md cursor-pointer"
            >
              <div>
                <h3 className="text-base md:text-lg lg:text-xl font-semibold">
                  {feedback.name}
                </h3>
                <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
                  {`${feedback.role}, ${feedback.company}`}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`w-full ${
            !isOpen ? "hidden" : "flex flex-col"
          } bg-card border border-border rounded-md`}
        >
          {selectedFeedback && (
            <div>
              <div className="w-full flex items-center justify-between p-1">
                <div
                  onClick={() => deleteFeedback(selectedFeedback._id)}
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
              <div className="w-full bg-card/1 px-2 md:px-3 lg:px-4 py-2 lg:py-3 rounded-md border border-border shadow-lg backdrop-blur-md">
                <p className="text-xs md:text-sm lg:text-base">
                  {`'' ${selectedFeedback.feedback} ''`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
