import React from "react";

const skills = [
  "React.js",
  "Next.js",
  "JavaScript",
  "Node.js",
  "Express.js",
  "Tailwind CSS",
  "MongoDB",
];

const Experience = () => {
  return (
    <section className="flex flex-col items-center gap-6 py-12">
      <h2 className="text-2xl text-foreground font-bold">
        Professional Experience
      </h2>
      <div className="bg-card/1 text-card-foreground rounded-xl backdrop-blur-md p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">Freelance Web Developer</h3>
            <p className="text-lg">Independent Contractor</p>
          </div>
          <p className="text-sm">2024 - Present</p>
        </div>
        <ul className="list-disc p-4">
          <li>
            Delivered custom web solutions for diverse clients across multiple
            industries.
          </li>
          <li>
            Collaborated directly with stakeholders to transform ideas into
            pixel-perfect reality.
          </li>
          <li>
            Built scalable, performance-optimized applications with modern tech
            stacks.
          </li>
          <li>
            Maintained 100% client satisfaction through clear communication and
            timely delivery.
          </li>
          <li>
            Specialized in responsive design and seamless user experience
            optimization.
          </li>
        </ul>
        <div className="flex items-center gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="px-4 pt-1 pb-1.5 bg-accent-foreground/5 text-sm rounded-full backdrop-blur-2xl"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
