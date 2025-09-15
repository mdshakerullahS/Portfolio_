const About = () => {
  return (
    <section
      id="about"
      className="flex flex-col items-center gap-4 md:gap-5 lg:gap-6 py-8 md:py-10 lg:py-12"
    >
      <h2 className="text-lg md:text-xl lg:text-2xl text-foreground font-bold">
        About Me
      </h2>
      <div className="bg-card/1 px-4 md:px-6 lg:px-8 py-4 lg:py-6 rounded-md border border-border shadow-lg backdrop-blur-md">
        <p className="text-card-foreground lg:text-lg pl-4 lg:pl-6 py-2 border-l-2 border-border">
          I'm a full-stack developer skilled in&nbsp;
          <strong>
            React.js, Next.js, Tailwind CSS, Node.js, Express.js, and MongoDB
          </strong>
          . I enjoy building responsive and user-friendly web applications that
          combine clean design with solid functionality.
          <br />
          <br />
          My journey in web development started with front-end design, where I
          quickly realized the power of turning ideas into interactive
          experiences. Over time, I expanded into full-stack development to
          bridge the gap between front-end creativity and back-end logic.
          <br />
          Passionate about problem-solving and continuous learning, I focus on
          writing efficient code, following best practices, and delivering
          meaningful digital experiences. I'm particularly interested in
          building tools that improve productivity and user engagement.
          <br />
          <br />
          Currently, I'm seeking remote internship or freelance opportunities
          where I can apply my skills, contribute to impactful projects, and
          grow as a developer. Outside of coding, I explore design tools
          like&nbsp;
          <strong>Figma</strong> and keep up with emerging technologies to stay
          ahead in the field.
        </p>
      </div>
    </section>
  );
};

export default About;
