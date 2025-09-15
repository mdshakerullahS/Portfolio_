"use client";

import SkillForm from "@/components/skillForm";
import { Trash } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import StackIcon from "tech-stack-icons";

const page = () => {
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
        setSkills(await data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSkills();
  }, []);

  const deleteSkill = async (id) => {
    try {
      if (!window.confirm("Are you sure?")) return;

      const res = await fetch(`http://localhost:8080/api/skills/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      setSkills((prev) => prev.filter((sk) => sk._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {skills.length > 0 ? (
        <div className="w-full flex items-center justify-center gap-4 flex-wrap">
          <SkillForm />
          {skills.map((skill, index) => (
            <div
              key={index}
              className="w-[80px] lg:w-[112px] h-[80px] lg:h-[112px] flex flex-col items-center justify-center gap-2 bg-card/1 max-w-[400px] text-card-foreground rounded-md border border-border overflow-hidden backdrop-blur-md hover:scale-[1.1] transition-all duration-350"
            >
              {mounted && (
                <>
                  <div
                    onClick={() => deleteSkill(skill._id)}
                    className="absolute top-1 right-1 cursor-pointer"
                  >
                    <Trash size={18} color="red" />
                  </div>
                  <div className="relative">
                    <div className="w-12 h-12 blur-2xl absolute top-6 left-0.5">
                      <StackIcon
                        name={skill.iconName}
                        variant={theme === "light" ? "light" : "dark"}
                      />
                    </div>
                    <div className="w-12 h-12">
                      <StackIcon
                        name={skill.iconName}
                        variant={theme === "light" ? "light" : "dark"}
                      />
                    </div>
                  </div>
                  <h4 className="text-sm lg:text-lg text-center">
                    {skill.name}
                  </h4>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
          <p className="text-sm lg:text-lg text-center">No skills added yet</p>
          <SkillForm />
        </div>
      )}
    </div>
  );
};

export default page;
