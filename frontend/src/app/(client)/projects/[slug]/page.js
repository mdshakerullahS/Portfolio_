const page = async ({ params }) => {
  const { slug } = await params;

  try {
    const res = await fetch("http://localhost:8080/api/projects", {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Unauthorized");
    }

    const data = await res.json();
    const projects = await data.data;
    return projects;
  } catch (error) {
    console.log(error);
  }
  const post = projects.find((project) => {
    if (project._id === slug) {
      return project;
    }
  });

  return (
    <div className="bg-card/1 mb-8 md:mb-10 lg:mb-12 backdrop-blur-md">
      {post ? (
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-[70%] h-fit flex flex-col gap-4 px-4 py-2 rounded-md border border-muted-foreground/20">
            <Image
              src={post.imageURL}
              width={840}
              height={96}
              alt={post.title}
              className="aspect-video object-top object-cover rounded-md"
            />
            <h1 className="text-4xl font-semibold">{post.title}</h1>
            <p className="lg:text-lg">{post.description}</p>
          </div>
          <div className="w-[30%] px-4 py-2 rounded-md border border-muted-foreground/20"></div>
        </div>
      ) : (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <p>Article not found.</p>
        </div>
      )}
    </div>
  );
};

export default page;
