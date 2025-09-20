"use client";

import { useData } from "@/app/context/Context";

const Experience = () => {
  const { experiences } = useData();

  return (
    <div
      className={`${
        experiences.length < 1 ? "hidden" : "flex"
      } flex-col items-center gap-6`}
    >
      <h2 className="text-base md:text-lg lg:text-xl text-foreground font-bold">
        Professional Experiences
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="w-full bg-card/1 px-4 md:px-6 lg:px-8 py-4 lg:py-6 rounded-md border border-border shadow-lg backdrop-blur-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-base md:text-lg lg:text-xl font-bold">
                  {exp.role}
                </h4>
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                  {exp.companyName}
                </p>
              </div>
              <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
                2024 - Present
              </p>
            </div>
            <ul className="list-disc flex flex-col gap-2 text-sm md:text-base lg:text-lg font-light p-4">
              {exp.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-2">
              {exp.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="px-4 pt-1 pb-1.5 bg-accent text-accent-foreground text-xs md:text-sm lg:text-base rounded-full backdrop-blur-2xl shadow-md"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
