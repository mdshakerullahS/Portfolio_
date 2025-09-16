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
import { useForm, useFieldArray } from "react-hook-form";
import { FileUp, Plus, X } from "lucide-react";

const ExperienceForm = () => {
  const [file, setFile] = useState("");

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      role: "",
      companyName: "",
      location: "",
      startDate: "",
      endDate: "",
      tasks: [""],
      technologies: [""],
      image: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("role", data.role);
    formData.append("companyName", data.company);
    formData.append("location", data.location);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    data.tasks.forEach((task, i) => formData.append(`tasks[${i}]`, task));
    data.technologies
      .split(",")
      .forEach((tech, i) => formData.append(`technologies[${i}]`, tech));
    formData.append("image", file);

    console.log(formData);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/experiences/add`,
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
            Add Experience
          </span>
          <Plus size={20} />
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[600px] overflow-y-auto hide-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Experience</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
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
              Location
              <input
                type="text"
                {...register("location")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="flex flex-col font-semibold">
              Start Date
              <input
                type="date"
                {...register("startDate")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="flex flex-col font-semibold">
              End Date
              <input
                type="date"
                {...register("endDate")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="flex flex-col gap-2 font-semibold">
              Tasks and Achievements
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    type="text"
                    {...register(`tasks.${index}`)}
                    className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="cursor-pointer"
                  >
                    <X />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append("")}
                className="flex items-center gap-1 text-sm cursor-pointer"
              >
                <Plus size={20} /> Add Task
              </button>
            </label>
            <label className="flex flex-col font-semibold">
              Technologies
              <input
                type="text"
                {...register("technologies")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="w-fit bg-input/40 p-3 font-normal rounded-md border border-border cursor-pointer">
              {!file && (
                <div className="flex gap-3">
                  Upload Logo <FileUp />
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
            <Button type="submit">Add Experience</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceForm;
