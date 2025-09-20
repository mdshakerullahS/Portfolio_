"use client";

import { useData } from "@/app/context/Context";
import Image from "next/image";
import React from "react";

const Page = ({ params }) => {
  const { articles } = useData();
  const { slug } = React.use(params);

  const post = articles.find((article) => {
    if (article._id === slug) {
      return article;
    }
  });

  return (
    <div className="bg-card/1 mb-8 md:mb-10 lg:mb-12 backdrop-blur-md">
      {post ? (
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-[70%] h-fit flex flex-col gap-4 p-4 rounded-md border border-muted-foreground/20">
            <Image
              src={post.imageURL}
              width={840}
              height={96}
              alt={post.title}
              className="aspect-video object-top object-cover rounded-md"
            />
            <h1 className="text-4xl font-semibold">{post.title}</h1>
            <p className="lg:text-lg">{post.content}</p>
          </div>
          <div className="w-full lg:w-[30%] px-4 py-2 rounded-md border border-muted-foreground/20"></div>
        </div>
      ) : (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <p>Article not found.</p>
        </div>
      )}
    </div>
  );
};

export default Page;
