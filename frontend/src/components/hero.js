"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Download } from "lucide-react";
import StackIcon from "tech-stack-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const herIcons = [
  {
    name: "react",
    top: "48%",
    left: "31%",
    rotate: "27deg",
  },
  {
    name: "js",
    top: "76%",
    left: "32%",
    rotate: "32deg",
  },
  {
    name: "nextjs2",
    top: "8%",
    left: "36%",
    rotate: "57deg",
  },
  {
    name: "tailwindcss",
    top: "63%",
    left: "85%",
    rotate: "12deg",
  },
  {
    name: "nodejs",
    top: "20%",
    left: "5%",
    rotate: "86deg",
  },
  {
    name: "mongodb",
    top: "20%",
    left: "85%",
    rotate: "60deg",
  },
];

const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative">
      {mounted && (
        <div className="w-full h-full absolute z-0 pointer-events-none">
          <div className="w-full max-w-[960px] mx-auto h-full relative">
            {herIcons.map((icon) => (
              <StackIcon
                name={icon.name}
                key={icon.name}
                variant={theme === "light" ? "light" : "dark"}
                className="w-10 lg:w-12 h-10 lg:h-12 blur-[1px] absolute z-0 pointer-events-none"
                style={{
                  top: icon.top,
                  left: icon.left,
                  rotate: icon.rotate,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-6 py-16">
        <div className="flex flex-col items-center gap-2 text-center pt-4 z-49">
          <h1 className="text-6xl md:text-7xl lg:text-8xl text-foreground font-bold">
            <span className="gradient-title">Full Stack</span>
            <span className="gradient-title"> Developer</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
            Passionate about clean code, stunning designs, and seamless user
            experiences
          </p>
        </div>
        <div className="flex gap-4 z-49">
          <Link href="/projects">
            <Button className="flex items-end gap-2 rounded-lg">
              View projects <ArrowRight size={18} />
            </Button>
          </Link>
          <Button variant="outline" className="rounded-lg">
            Download resume
            <Download />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
