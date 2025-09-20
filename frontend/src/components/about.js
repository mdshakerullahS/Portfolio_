import AboutContent from "./aboutContent";

const About = () => {
  return (
    <section className="flex flex-col items-center gap-4 md:gap-5 lg:gap-6 py-8 md:py-10 lg:py-12">
      <h2 className="text-xl md:text-2xl lg:text-4xl text-foreground font-bold">
        About Me
      </h2>
      <AboutContent />
    </section>
  );
};

export default About;
