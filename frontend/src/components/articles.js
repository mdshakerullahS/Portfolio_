import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Articles = async () => {
  let articles = [];
  try {
    const res = await fetch("http://localhost:8080/api/blogs", {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Unauthorized");
    }

    const data = await res.json();
    articles = await data.data;
  } catch (error) {
    console.log(error);
  }
  const featuredArticles = articles.filter((article) => {
    if (article.featured === true) return article;
  });
  return (
    <section
      id="blogs"
      className={`${
        featuredArticles.length < 1 ? "hidden" : "flex"
      } flex-col items-center gap-4 md:gap-5 lg:gap-6 py-8 md:py-10 lg:py-12`}
    >
      <h2 className="text-lg md:text-xl lg:text-2xl text-foreground font-bold">
        Top Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredArticles.map((article, index) => (
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

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold line-clamp-1">
                  {article.title}
                </h3>
                <div className="flex flex-col items-end">
                  <p className="text-base lg:text-lg line-clamp-4 leading-6">
                    {article.content}
                  </p>

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

      <div
        className={`w-full ${
          articles.length > 3 ? "flex" : "hidden"
        } justify-end`}
      >
        <Link
          href="/blogs"
          className="px-3 pt-1 pb-1.5 bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground text-xs md:text-sm rounded-md backdrop-blur-2xl flex items-end gap-2"
        >
          See all blogs <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default Articles;
