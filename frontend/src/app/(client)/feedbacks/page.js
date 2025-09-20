"use client";

import Feedbacks from "@/components/feedbacks";
import { Button } from "@/components/ui/button";
import { FileUp, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [file, setFile] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("company", data.company);
    formData.append("role", data.role);
    formData.append("feedback", data.feedback);
    formData.append("image", file);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/feedbacks/save`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to send feedback");
      }

      reset();
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <Feedbacks />

      <div className="w-[75%] min-w-[300px] mx-auto bg-card/1 text-foreground space-y-2 rounded-lg border border-border shadow-lg backdrop-blur-md p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-2"
        >
          <label className="w-fit bg-input/40 p-3 font-normal rounded-md border border-border cursor-pointer">
            {!file && (
              <div className="flex gap-3">
                Upload Picture <FileUp />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile instanceof File) {
                  setFile(selectedFile);
                } else {
                  setFile(null);
                }
              }}
              className="hidden"
            />

            {file instanceof File && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="mt-2 w-20 h-20 object-cover rounded-full"
              />
            )}
          </label>

          <div className="w-full space-y-2">
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
              {errors.email && (
                <span className="text-sm font-normal text-destructive">
                  Email is required
                </span>
              )}
            </label>

            <label className="flex flex-col font-semibold">
              Company
              <input
                type="text"
                placeholder="Google"
                {...register("company", { required: true })}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
              {errors.company && (
                <span className="text-sm font-normal text-destructive">
                  Company is required
                </span>
              )}
            </label>

            <label className="flex flex-col font-semibold">
              Role
              <input
                type="text"
                placeholder="CEO"
                {...register("role", { required: true })}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
              {errors.role && (
                <span className="text-sm font-normal text-destructive">
                  Role is required
                </span>
              )}
            </label>

            <label className="flex flex-col font-semibold">
              Feedback
              <textarea
                placeholder="Express your experience here..."
                {...register("feedback", { required: true })}
                className="bg-input/40 min-h-24 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
              {errors.feedback && (
                <span className="text-sm font-normal text-destructive">
                  Feedback is required
                </span>
              )}
            </label>

            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
