"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { FileUp, Plus } from "lucide-react";

const TestimonialForm = () => {
  const [file, setFile] = useState("");

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", file);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/testimonials/add`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add skill");
      }

      reset();
    } catch (err) {
      console.error("Error submitting skill:", err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-2 px-3 py-1 bg-card/1 text-card-foreground rounded-md border border-border backdrop-blur-md cursor-pointer">
          <span className="text-sm lg:text-base text-center">
            Add Testimonial
          </span>
          <Plus size={20} />
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[600px] overflow-y-auto hide-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Testimonial</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <label className="flex flex-col font-semibold">
              Name
              <input
                type="text"
                {...register("name")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="flex flex-col font-semibold">
              Role
              <input
                type="text"
                {...register("role")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="flex flex-col font-semibold">
              Company
              <input
                type="text"
                {...register("company")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="flex flex-col font-semibold">
              Testimonial
              <textarea
                {...register("testimonial")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="flex flex-col font-semibold">
              Rating
              <input
                type="text"
                {...register("rating")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="flex flex-col font-semibold">
              Social Media
              <input
                type="text"
                {...register("socialLink")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="w-fit bg-input/40 p-3 font-normal rounded-md border border-border cursor-pointer">
              {!file && (
                <div className="flex gap-3">
                  Upload Avatar Image <FileUp />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                {...register("image")}
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
                  className="mt-2 w-32 h-20 object-cover rounded"
                />
              )}
            </label>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Add Testimonial</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialForm;
