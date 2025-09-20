"use client";

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
import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";

const ExperienceForm = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      role: "",
      companyName: "",
      location: "",
      startDate: "",
      endDate: "",
      tasks: [""],
      technologies: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      tasks: data.tasks.filter((task) => task.trim() !== ""),
      technologies: data.technologies
        ? data.technologies.split(",").map((tech) => tech.trim())
        : [],
    };

    console.log(payload);
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/experiences/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add experience");
      }

      reset();
      setOpen(false);
    } catch (err) {
      console.error("Error submitting experience:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-2 px-3 py-1 bg-card/1 text-card-foreground rounded-md border border-border backdrop-blur-md cursor-pointer"
        >
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
                {...register("companyName")}
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
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Add experience"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceForm;
