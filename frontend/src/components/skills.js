"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import StackIcon from "tech-stack-icons";

const Skills = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/skills", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        const data = await res.json();
        setSkills(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSkills();
  }, []);

  return (
    <section
      className={`${
        skills.length <= 0 ? "hidden" : "flex"
      } flex-col items-center gap-4 md:gap-5 lg:gap-6 py-8 md:py-10 lg:py-12`}
    >
      <h2 className="text-lg md:text-xl lg:text-2xl text-foreground font-bold">
        Skills & Technologies
      </h2>

      <div className="w-full flex items-center justify-center gap-4 flex-wrap">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="w-[80px] lg:w-[112px] h-[80px] lg:h-[112px] flex flex-col items-center justify-center gap-2 bg-card/1 max-w-[400px] text-card-foreground rounded-md border border-border overflow-hidden backdrop-blur-md hover:scale-[1.1] transition-all duration-350"
          >
            {mounted && (
              <div className="relative">
                <div className="w-12 h-12 blur-2xl absolute top-6 left-0.5">
                  <StackIcon
                    name={skill.iconName}
                    variant={theme === "light" ? "light" : "dark"}
                  />
                </div>
                <div className="w-10 h-10">
                  <StackIcon
                    name={skill.iconName}
                    variant={theme === "light" ? "light" : "dark"}
                  />
                </div>
              </div>
            )}
            <h4 className="text-sm lg:text-lg text-center">{skill.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
