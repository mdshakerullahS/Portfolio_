"use client";

import { useData } from "@/app/context/Context";
import ExperienceForm from "@/components/experienceForm";
import { Trash, X } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [selectedExperience, setSelectedExperience] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { experiences, setExperiences } = useData();

  const deleteExperience = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/experiences/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      setExperiences((prev) => prev.filter((exp) => exp._id !== id));

      if (selectedExperience && selectedExperience._id === id) {
        setSelectedExperience(null);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          {experiences.map((experience) => (
            <div
              key={experience._id}
              onClick={() => {
                setSelectedExperience(experience);
                setIsOpen(true);
              }}
              className="px-4 py-2 bg-card border border-border rounded-md cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{experience.role}</h3>
              <p className="text-sm">{experience.companyName}</p>
            </div>
          ))}
        </div>
        <div
          className={`w-full ${
            !isOpen ? "hidden" : "flex flex-col"
          } bg-card border border-border rounded-md relative group`}
        >
          {selectedExperience && (
            <>
              <div className="px-4 py-2 flex flex-col gap-2">
                <div>
                  <div className="w-full flex items-center justify-between px-0 lg:px-1 pb-2">
                    <div
                      onClick={() => deleteExperience(selectedExperience._id)}
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
                  <div className="w-full bg-card/1 px-4 md:px-6 lg:px-8 py-4 lg:py-6 rounded-md border border-border shadow-lg backdrop-blur-md">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base md:text-lg lg:text-xl font-bold">
                          {selectedExperience.role}
                        </h4>
                        <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                          {selectedExperience.companyName}
                        </p>
                      </div>
                      <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
                        <span>
                          {new Date(selectedExperience.startDate).getFullYear()}
                        </span>
                        -
                        <span>
                          {selectedExperience.endDate
                            ? new Date(selectedExperience.endDate).getFullYear()
                            : "Present"}
                        </span>
                      </p>
                    </div>
                    <ul className="list-disc flex flex-col gap-2 text-sm md:text-base lg:text-lg font-light p-4">
                      {selectedExperience.tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-2">
                      {selectedExperience.technologies.map((tech, index) => (
                        <div
                          key={index}
                          className="px-4 pt-1 pb-1.5 bg-accent text-accent-foreground text-xs md:text-sm lg:text-base rounded-full backdrop-blur-2xl shadow-md"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
