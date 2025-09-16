import Image from "next/image";
import { ArrowRight, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

const Projects = async () => {
  let projects = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Unauthorized");
    }

    const data = await res.json();
    projects = await data.data;
    return projects;
  } catch (error) {
    console.log(error);
  }

  return (
    <section
      id="projects"
      className={`${
        projects.length < 1 ? "hidden" : "flex"
      } flex-col items-center gap-4 md:gap-5 lg:gap-6 py-8 md:py-10 lg:py-12`}
    >
      <h2 className="text-lg md:text-xl lg:text-2xl text-foreground font-bold">
        Featured Projects
      </h2>

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
                  href={`/projects/${project._id}`}
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

      <div
        className={`w-full ${
          projects.length > 3 ? "flex" : "hidden"
        } justify-end`}
      >
        {" "}
        <Link
          href="/projects"
          className="px-3 pt-1 pb-1.5 bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foregrounds text-xs md:text-sm rounded-md backdrop-blur-2xl flex items-end gap-2"
        >
          View all projects <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default Projects;
