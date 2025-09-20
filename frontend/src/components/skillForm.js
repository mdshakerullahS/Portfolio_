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
import { useForm } from "react-hook-form";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

const SkillForm = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to add skill");
      }

      reset();
      setOpen(false);
    } catch (err) {
      console.error("Error submitting skill:", err);
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
          <span className="text-sm lg:text-base text-center">Add Skill</span>
          <Plus size={20} />
        </button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add skill</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <label className="flex flex-col font-semibold">
              Skill Name
              <input
                type="text"
                {...register("name")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="flex flex-col font-semibold">
              Icon Name
              <input
                type="text"
                {...register("iconName")}
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
                "Add skill"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SkillForm;
