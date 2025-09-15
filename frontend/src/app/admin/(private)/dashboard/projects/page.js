"use client";

import { useEffect, useState } from "react";
import ProjectForm from "@/components/projectForm";
import { Edit, Trash, X } from "lucide-react";
import ProjectEditForm from "@/components/projectEditForm";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const deleteProject = async (id) => {
    try {
      if (!window.confirm("Are you sure?")) return;

      const res = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      setProjects((prev) => prev.filter((pro) => pro._id !== id));

      if (selectedProject && selectedProject._id === id) {
        setSelectedProject(null);
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
        <ProjectForm setProjects={setProjects} />
      </div>
      <div className="w-full flex flex-col lg:flex-row items-start gap-4">
        <div
          className={`${
            !isOpen && "lg:w-[50%]"
          } w-full max-h-[420px] flex flex-col bg-card border border-border rounded-md overflow-hidden`}
        >
          {projects.map((project) => (
            <h3
              key={project._id}
              onClick={() => {
                setSelectedProject(project);
                setIsOpen(true);
              }}
              className="text-lg font-semibold px-4 py-2 border border-border cursor-default"
            >
              {project.title}
            </h3>
          ))}
        </div>
        <div
          className={`w-full ${
            !isOpen ? "hidden" : "flex flex-col"
          } bg-card border border-border rounded-md`}
        >
          {selectedProject && (
            <>
              <div className="w-full flex justify-between px-4 pt-4">
                <div className="flex gap-2">
                  <ProjectEditForm
                    setProjects={setProjects}
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                  />
                  <div
                    onClick={() => deleteProject(selectedProject._id)}
                    className="cursor-pointer"
                  >
                    <Trash size={18} color="red" />
                  </div>
                </div>
                <div
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer"
                >
                  <X size={18} />
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="w-full rounded-md">
                  <Image
                    src={selectedProject.imageURL}
                    width={840}
                    height={96}
                    alt={selectedProject.title}
                    className="aspect-video object-top object-cover rounded-md"
                  />
                </div>
                <h3 className="text-lg font-semibold">
                  {selectedProject.title}
                </h3>
                <p>{selectedProject.description}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
