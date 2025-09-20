"use client";

import Image from "next/image";
import Link from "next/link";
import { useData } from "@/app/context/Context";

const Page = () => {
  const { articles } = useData();

  return (
    <div className="min-h-[80vh] pb-8">
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="max-w-[400px] p-3 lg:p-4 bg-card/1 text-card-foreground rounded-md shadow-lg backdrop-blur-md"
            >
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={article.imageURL}
                  width={360}
                  height={64}
                  alt={article.title}
                  className="aspect-video object-top object-cover rounded-md"
                />

                <div className="w-full flex flex-col gap-2">
                  <h3 className="text-xl font-bold line-clamp-1">
                    {article.title}
                  </h3>
                  <p className="text-base lg:text-lg line-clamp-4 leading-6">
                    {article.content}
                  </p>
                  <div className="flex justify-end">
                    <Link
                      href={`/blogs/${article._id}`}
                      className="text-xs md:text-sm font-semibold hover:underline"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <p className="md:text-lg lg:text-xl">Blogs will be shown here.</p>
        </div>
      )}
    </div>
  );
};

export default Page;
