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
import { Edit, FileUp, Loader } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const ProjectEditForm = ({
  setProjects,
  selectedProject,
  setSelectedProject,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: selectedProject?.title || "",
      content: selectedProject?.content || "",
      demoURL: selectedProject.demoURL || "",
      sourceCodeURL: selectedProject.sourceCodeURL || "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("demoURL", data.demoURL);
    formData.append("sourceCodeURL", data.sourceCodeURL);
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${selectedProject._id}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update project");
      }

      const result = await res.json();
      setProjects((prev) =>
        prev.map((pro) =>
          pro._id === result.updatedProject._id ? result.updatedProject : pro
        )
      );
      setSelectedProject((prev) =>
        prev && prev._id === result.updatedProject._id
          ? data.updatedProject
          : prev
      );

      reset();
      setOpen(false);
    } catch (err) {
      console.error("Error submitting project:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setOpen(true)} className="cursor-pointer">
          <Edit size={18} />
        </button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Update Project</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <label className="flex flex-col font-semibold">
              Project Title
              <input
                type="text"
                {...register("title")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="flex flex-col font-semibold">
              Project Description
              <input
                type="text"
                {...register("description")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="flex flex-col font-semibold">
              Demo URL
              <input
                type="text"
                {...register("demoURL")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="flex flex-col font-semibold">
              Source Code URL
              <input
                type="text"
                {...register("sourceCodeURL")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="w-fit bg-input/40 p-3 font-normal rounded-md border border-border cursor-pointer">
              {!file && (
                <div className="flex gap-3">
                  Upload Image <FileUp />
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
                <Image
                  src={URL.createObjectURL(file)}
                  width={256}
                  height={64}
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
            <Button type="submit">
              {loading ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectEditForm;
