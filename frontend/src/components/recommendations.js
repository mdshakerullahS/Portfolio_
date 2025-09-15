const recommendations = [
  {
    name: "Omar faruk",
    profession: "Software Engineer, Meta",
    relationship: "Mentor",
    message:
      "Shakerullah has consistently demonstrated a strong work ethic, technical proficiency, and exceptional leadership skills throughout his tenure. As a student council member, Shakerullah played a pivotal role in organizing and executing various student events.",
  },
  {
    name: "Omar faruk",
    profession: "Software Engineer, Google",
    relationship: "Colleague",
    message:
      "Shakerullah has consistently demonstrated a strong work ethic, technical proficiency, and exceptional leadership skills throughout his tenure. As a student council member, Shakerullah played a pivotal role in organizing and executing various student events.",
  },
];

const Recommendations = () => {
  return (
    <section className="flex flex-col items-center gap-4 md:gap-5 lg:gap-6 py-8 md:py-10 lg:py-12">
      <h2 className="text-lg md:text-xl lg:text-2xl text-foreground font-bold">
        Recommendations
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4%]">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="bg-card/1 max-w-[560px] text-card-foreground rounded-md backdrop-blur-md space-y-6 p-3 md:p-4"
          >
            <blockquote className="italic text-sm md:text-base">
              &quot;{recommendation.message}&quot;
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent rounded-full"></div>
              <div>
                <h4 className="font-semibold">{recommendation.name}</h4>
                <p className="text-sm">{recommendation.profession}</p>
                <p className="text-xs">{recommendation.relationship}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
