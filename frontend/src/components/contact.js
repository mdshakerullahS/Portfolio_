import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <section className="bg-gradient-to-b from-primary/10 via-background to-primary/10 flex flex-col items-center gap-6 px-2 py-8 mx-auto mb-10 rounded-md">
      <div className="text-center space-y-2">
        <h2 className="text-xl md:text-2xl lg:text-4xl text-foreground font-bold">
          Get In Touch
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
          Have a project in mind or want to collaborate? I&apos;d love to hear
          from you!
        </p>
      </div>
      <Link href="/contact">
        <Button className="flex items-center text-sm lg:text-base">
          Contact me
          <ArrowRight size={18} />
        </Button>
      </Link>
    </section>
  );
};

export default Contact;
