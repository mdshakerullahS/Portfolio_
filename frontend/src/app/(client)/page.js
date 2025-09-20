import About from "@/components/about";
import Articles from "@/components/articles";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Feedbacks from "@/components/feedbacks";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Feedbacks />
      <Articles />
      <Contact />
    </main>
  );
}
