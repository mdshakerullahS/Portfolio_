"use client";

import ExperienceForm from "@/components/experienceForm";
import { Edit, Trash, X } from "lucide-react";
import { useState } from "react";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-end">
      <div className="w-full flex justify-between mb-6">
        <h2 className="text-3xl font-semibold">Projects</h2>
        <ExperienceForm />
      </div>
      <div className="w-full flex flex-col lg:flex-row items-start gap-4">
        <div
          className={`${
            !isOpen && "lg:w-[50%]"
          } w-full max-h-[420px] flex flex-col bg-card border border-border rounded-md overflow-hidden`}
        >
          <h3
            onClick={() => setIsOpen(true)}
            className="text-lg font-semibold px-4 py-2 border border-border cursor-default"
          >
            Project inquiry
          </h3>
        </div>
        <div
          className={`w-full ${
            !isOpen ? "hidden" : "flex flex-col"
          } bg-card border border-border rounded-md relative group`}
        >
          <div
            onClick={() => setIsOpen(false)}
            className="hidden group-hover:block bg-black p-2 rounded-md absolute top-0 left-0"
          >
            <X size={18} />
          </div>
          <div className="px-4 py-2 flex flex-col gap-2">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">experience1</h3>
              <div className="flex gap-2">
                <Edit size={18} />
                <Trash size={18} color="red" />
              </div>
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
