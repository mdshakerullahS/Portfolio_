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
import { Edit, FileUp } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const BlogEditForm = ({ setArticles, selectedArticle, setSelectedArticle }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: selectedArticle?.title || "",
      content: selectedArticle?.content || "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", file);

    try {
      const res = await fetch(
        `http://localhost:8080/api/blogs/${selectedArticle._id}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update blog");
      }

      const result = await res.json();
      setArticles((prev) =>
        prev.map((art) =>
          art._id === result.updatedBlog._id ? result.updatedBlog : art
        )
      );
      setSelectedArticle((prev) =>
        prev && prev._id === result.updatedBlog._id ? data.updatedBlog : prev
      );

      reset();
      setOpen(false);
    } catch (err) {
      console.error("Error submitting blog:", err);
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
            <DialogTitle>Update Blog</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <label className="flex flex-col font-semibold">
              Blog Title
              <input
                type="text"
                {...register("title")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="flex flex-col font-semibold">
              Blog Description
              <input
                type="text"
                {...register("content")}
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
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogEditForm;
