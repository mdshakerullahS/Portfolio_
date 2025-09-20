"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { GithubIcon, LinkedinIcon, Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/messages/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      reset();
    } catch (err) {
      console.error("Error sending message:", err);
    }
    reset();
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[4%] p-[2%]">
      <div className="bg-card/1 text-foreground space-y-2 rounded-lg border border-border shadow-lg backdrop-blur-md p-4">
        <div>
          <h4 className="text-base md:text-lg lg:text-xl font-bold">
            Send me a message
          </h4>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
            Fill out the form below and I&apos;ll get back to you as soon as
            possible.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="flex flex-col font-semibold">
            Name
            <input
              type="text"
              placeholder="John Doe"
              {...register("name", { required: true })}
              className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
            />
            {errors.name && (
              <span className="text-sm font-normal text-destructive">
                Name is required
              </span>
            )}
          </label>

          <label className="flex flex-col font-semibold">
            Email
            <input
              type="email"
              placeholder="john@example.com"
              {...register("email", { required: true })}
              className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
            />
            {errors.name && (
              <span className="text-sm font-normal text-destructive">
                Email is required
              </span>
            )}
          </label>

          <label className="flex flex-col font-semibold">
            Subject
            <input
              type="text"
              placeholder="Project inquiry"
              {...register("subject", { required: true })}
              className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
            />
            {errors.name && (
              <span className="text-sm font-normal text-destructive">
                Subject is required
              </span>
            )}
          </label>

          <label className="flex flex-col font-semibold">
            Message
            <textarea
              placeholder="I'd like to discuss a project opportunity..."
              {...register("message", { required: true })}
              className="bg-input/40 min-h-24 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
            />
            {errors.name && (
              <span className="text-sm font-normal text-destructive">
                Message is required
              </span>
            )}
          </label>

          <Button className="w-full flex items-end">
            Send message
            <Send />
          </Button>
        </form>
      </div>

      <div className="bg-card/1 text-foreground flex flex-col items-center lg:items-start gap-4 rounded-lg border border-border shadow-lg backdrop-blur-md p-4">
        <div className="text-center lg:text-start">
          <h4 className="text-base md:text-lg lg:text-xl font-bold">
            Connect with me
          </h4>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
            You can also reach out to me directly through these channels.
          </p>
        </div>
        <div className="w-full flex lg:flex-col gap-4">
          <Link href="https://github.com/mdshakerullahS" target="_blank">
            <div className="flex gap-4 p-2 bg-card/20 hover:bg-accent rounded-md border border-border">
              <div className="p-3 rounded-full">
                <GithubIcon />
              </div>
              <div className="hidden lg:block">
                <h4 className="font-semibold">GitHub</h4>
                <p className="text-sm text-muted-foreground">
                  https://github.com/mdshakerullahS
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="https://www.linkedin.com/in/mdshakerullah"
            target="_blank"
          >
            <div className="flex gap-4 p-2 bg-card/20 hover:bg-accent rounded-md border border-border">
              <div className="p-3 rounded-full">
                <LinkedinIcon />
              </div>
              <div className="hidden lg:block">
                <h4 className="font-semibold">LinkedIn</h4>
                <p className="text-sm text-muted-foreground">
                  https://www.linkedin.com/in/mdshakerullah
                </p>
              </div>
            </div>
          </Link>

          <Link href="mailto:sourovmdshakerullah@gmail.com" target="_blank">
            <div className="flex gap-4 p-2 bg-card/20 hover:bg-accent rounded-md border border-border">
              <div className="p-3 rounded-full">
                <Mail />
              </div>
              <div className="hidden lg:block">
                <h4 className="font-semibold">Email</h4>
                <p className="text-sm text-muted-foreground">
                  sourovmdshakerullah@gmail.com
                </p>
              </div>
            </div>
          </Link>

          <Link href="tel:+8801712815566" target="_blank">
            <div className="flex gap-4 p-2 bg-card/20 hover:bg-accent rounded-md border border-border">
              <div className="p-3 rounded-full">
                <Phone />
              </div>
              <div className="hidden lg:block">
                <h4 className="font-semibold">Phone</h4>
                <p className="text-sm text-muted-foreground">+8801712815566</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="text-center lg:text-start">
          <h4 className="font-semibold">Current Location</h4>
          <p className="text-muted-foreground">Joypurhat, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
