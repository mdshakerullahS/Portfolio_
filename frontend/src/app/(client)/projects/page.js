"use client";

import { useEffect, useState } from "react";
import { ArrowRight, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/projects", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setProjects(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);
  return (
    <div className="min-h-[80vh] pb-8">
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="max-w-[400px] p-3 lg:p-4 bg-card/1 text-card-foreground rounded-md shadow-lg backdrop-blur-md"
            >
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={project.imageURL}
                  width={360}
                  height={64}
                  alt={project.title}
                  className="aspect-video object-top object-cover rounded-md"
                />

                <div className="flex flex-col items-start gap-2">
                  <h3 className="text-xl font-bold line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-base lg:text-lg line-clamp-4 leading-6">
                    {project.description}
                  </p>
                </div>

                <div className="w-full flex items-center justify-between">
                  <Link
                    href={`/projects/${project.title
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                    className="px-3 pt-1 pb-1.5 bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground text-sm rounded-md backdrop-blur-2xl flex items-end gap-2"
                  >
                    View details
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href={""}
                    className="px-3 pt-1 pb-1.5 bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground text-sm rounded-md backdrop-blur-2xl flex items-end gap-2"
                  >
                    Live demo
                    <SquareArrowOutUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <p className="md:text-lg lg:text-xl">Projects will be shown here.</p>
        </div>
      )}
    </div>
  );
};

export default page;
