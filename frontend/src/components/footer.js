import Link from "next/link";

const Footer = () => {
  return (
    <section className="flex flex-col items-center py-4 bg-foreground text-background text-center text-sm md:text-base rounded-md mx-2 my-1">
      <p>
        &copy; {new Date().getFullYear()} &bull;
        <Link href="/"> shakerullah</Link> &bull; All Rights Reserved
      </p>
    </section>
  );
};

export default Footer;
