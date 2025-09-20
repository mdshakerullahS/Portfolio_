"use client";

import { useData } from "@/app/context/Context";
import BlogForm from "@/components/blogForm";
import ExperienceForm from "@/components/experienceForm";
import ProjectForm from "@/components/projectForm";
import SkillForm from "@/components/skillForm";
import {
  Briefcase,
  FolderKanban,
  Quote,
  NotebookText,
  Inbox,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const quickStats = [
  {
    label: "Total Experiences",
    icon: Briefcase,
    href: "/admin/dashboard/experiences",
  },
  {
    label: "Total Projects",
    icon: FolderKanban,
    href: "/admin/dashboard/projects",
  },
  {
    label: "Total Feedbacks",
    icon: Quote,
    href: "/admin/dashboard/feedbacks",
  },
  {
    label: "Total Articles",
    icon: NotebookText,
    href: "/admin/dashboard/blogs",
  },
  { label: "Total Messages", icon: Inbox, href: "/admin/dashboard/inbox" },
];

const Page = () => {
  const { experiences, projects, feedbacks, articles, messages } = useData();

  return (
    <div className="bg-card/1 px-2 md:px-3 lg:px-4 py-2 md:py-3 lg:py-4 space-y-8 rounded-md border border-border shadow-lg backdrop-blur-md">
      <div className="space-y-2 md:space-y-3 lg:space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-foreground font-bold">
          Quick Stats
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
          {quickStats.map((stat) => {
            let count = 0;

            if (stat.label === "Total Experiences")
              count = experiences?.length || 0;
            if (stat.label === "Total Projects") count = projects?.length || 0;
            if (stat.label === "Total Feedbacks")
              count = feedbacks?.length || 0;
            if (stat.label === "Total Articles") count = articles?.length || 0;
            if (stat.label === "Total Messages") count = messages?.length || 0;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="bg-card/1 flex flex-col items-center gap-1 md:gap-3 lg:gap-4 px-2 lg:px-3 py-2 md:py-4 lg:py-3 rounded-md border border-border shadow-lg backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <stat.icon size={18} />
                  <p className="text-sm md:text-base lg:text-lg">
                    {stat.label}
                  </p>
                </div>
                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center">
                  {count}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 md:space-y-3 lg:space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-foreground font-bold">
          Recent Activity
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card/1 px-2 md:px-4 py-2 md:py-3 space-y-4 rounded-md border border-border shadow-lg backdrop-blur-md">
            <h3 className="text-base md:text-lg lg:text-xl text-foreground font-semibold">
              Latest Projects
            </h3>
            <div className="flex overflow-x-auto">
              {projects.slice(0, 3).map((project, index) => (
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

                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold line-clamp-1">
                        {project.title}
                      </h3>
                      <div className="flex flex-col items-end">
                        <p className="text-base lg:text-lg line-clamp-4 leading-6">
                          {project.description}
                        </p>

                        <Link
                          href={`/blogs/${project._id}`}
                          className="text-xs md:text-sm font-semibold hover:underline"
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card/1 px-2 md:px-4 py-2 md:py-3 space-y-4 rounded-md border border-border shadow-lg backdrop-blur-md">
            <h3 className="text-base md:text-lg lg:text-xl text-foreground font-semibold">
              Latest Articles
            </h3>
            <div className="flex overflow-x-auto">
              {articles.slice(0, 3).map((article, index) => (
                <div
                  key={index}
                  className="max-w-[400px] p-3 lg:p-4 bg-card/1 text-card-foreground rounded-md shadow-lg backdrop-blur-md"
                >
                  <div className="flex flex-col items-center gap-4">
                    <Image
                      src={article.imageURL}
                      width={360}
                      height={64}
                      alt={article.title}
                      className="aspect-video object-top object-cover rounded-md"
                    />

                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold line-clamp-1">
                        {article.title}
                      </h3>
                      <div className="flex flex-col items-end">
                        <p className="text-base lg:text-lg line-clamp-4 leading-6">
                          {article.content}
                        </p>

                        <Link
                          href={`/blogs/${article._id}`}
                          className="text-xs md:text-sm font-semibold hover:underline"
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 md:space-y-3 lg:space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-foreground font-bold">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ProjectForm />
          <ExperienceForm />
          <SkillForm />
          <BlogForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
