"use client";

import { useEffect, useState } from "react";
import BlogForm from "@/components/blogForm";
import { Trash, X } from "lucide-react";
import Image from "next/image";
import BlogEditForm from "@/components/blogEditForm";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/blogs", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        const data = await res.json();
        setArticles(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getArticles();
  }, []);

  const deleteArticle = async (id) => {
    try {
      if (!window.confirm("Are you sure?")) return;

      const res = await fetch(`http://localhost:8080/api/blogs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

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
            <h3
              key={article._id}
              onClick={() => {
                setSelectedArticle(article);
                setIsOpen(true);
              }}
              className="text-lg font-semibold px-4 py-2 border border-border cursor-pointer"
            >
              {article.title}
            </h3>
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
