"use client";

import { useState } from "react";
import BlogForm from "@/components/blogForm";
import { PinIcon, PinOff, Trash, X } from "lucide-react";
import Image from "next/image";
import BlogEditForm from "@/components/blogEditForm";
import { useData } from "@/app/context/Context";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const { articles, setArticles } = useData();

  const pinArticles = async (id) => {
    try {
      const article = articles.find((a) => a._id === id);
      if (!article) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ featured: !article.featured }),
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to pin article");
      }

      const result = await res.json();
      setArticles((prev) =>
        prev.map((art) =>
          art._id === result.updatedArticle._id ? result.updatedArticle : art
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async (id) => {
    try {
      if (!window.confirm("Are you sure?")) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      setArticles((prev) => prev.filter((art) => art._id !== id));

      if (selectedArticle && selectedArticle._id === id) {
        setSelectedArticle(null);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <div className="w-full flex justify-between mb-6">
        <h2 className="text-3xl font-semibold">Blogs</h2>
        <BlogForm setArticles={setArticles} />
      </div>
      <div className="w-full flex flex-col lg:flex-row items-start gap-4">
        <div
          className={`${
            !isOpen && "lg:w-[50%]"
          } w-full max-h-[420px] flex flex-col bg-card border border-border rounded-md overflow-hidden`}
        >
          {articles.map((article) => (
            <div key={article._id} className="flex items-center">
              <h3
                onClick={() => {
                  setSelectedArticle(article);
                  setIsOpen(true);
                }}
                className="w-full text-lg font-semibold px-4 py-2 cursor-pointer"
              >
                {article.title}
              </h3>
              <div
                onClick={() => pinArticles(article._id)}
                className="p-4 hover:bg-accent rounded-md cursor-pointer"
              >
                {article.featured ? (
                  <PinOff size={18} />
                ) : (
                  <PinIcon size={18} />
                )}
              </div>
            </div>
          ))}
        </div>
        <div
          className={`w-full ${
            !isOpen ? "hidden" : "flex flex-col"
          } bg-card border border-border rounded-md`}
        >
          {selectedArticle && (
            <>
              <div className="w-full flex justify-between px-4 pt-4">
                <div className="flex gap-2">
                  <BlogEditForm
                    setArticles={setArticles}
                    selectedArticle={selectedArticle}
                    setSelectedArticle={setSelectedArticle}
                  />
                  <div
                    onClick={() => deleteArticle(selectedArticle._id)}
                    className="cursor-pointer"
                  >
                    <Trash size={18} color="red" />
                  </div>
                </div>
                <div
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer"
                >
                  <X size={18} />
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="w-full rounded-md">
                  <Image
                    src={selectedArticle.imageURL}
                    width={840}
                    height={96}
                    alt={selectedArticle.title}
                    className="aspect-video object-top object-cover rounded-md"
                  />
                </div>
                <h3 className="text-lg font-semibold">
                  {selectedArticle.title}
                </h3>
                <p>{selectedArticle.content}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
