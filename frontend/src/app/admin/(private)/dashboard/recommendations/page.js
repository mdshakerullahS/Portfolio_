"use client";

import { Edit, Trash, X } from "lucide-react";
import { useState } from "react";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-[100vh]">
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div
          className={`${
            !isOpen && "lg:w-[50%]"
          } w-full max-h-[420px] flex flex-col bg-card border border-border rounded-md overflow-hidden`}
        >
          <h3
            onClick={() => setIsOpen(true)}
            className="text-lg font-semibold px-4 py-2 border border-border cursor-pointer"
          >
            Project inquiry
          </h3>
        </div>
        <div
          className={`w-full ${
            !isOpen ? "hidden" : "flex flex-col"
          } bg-card border border-border rounded-md`}
        >
          <div className="px-4 py-2 flex flex-col gap-2">
            <div className="w-full flex justify-between pt-2">
              <div className="flex gap-2">
                <Edit size={18} />
                <div
                  onClick={() => deleteArticle(selectedArticle._id)}
                  className="cursor-pointer"
                >
                  <Trash size={18} color="red" />
                </div>
              </div>
              <div onClick={() => setIsOpen(false)} className="cursor-pointer">
                <X size={18} />
              </div>
            </div>
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">experience1</h3>
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit quia
              nisi amet ea quisquam nihil dolorum temporibus incidunt at
              aspernatur nostrum in, laborum eveniet fuga quas. Rem esse
              voluptas ad!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
