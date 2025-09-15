import About from "@/components/about";
import Articles from "@/components/articles";
// import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
// import Recommendations from "@/components/recommendations";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      {/* <Experience /> */}
      <Projects />
      <Skills />
      {/* <Recommendations /> */}
      <Articles />
      <Contact />
    </main>
  );
}
