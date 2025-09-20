import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6 px-8 md:px-46 lg:px-96 text-center">
      <div className="space-y-1">
        <h1 className="text-6xl lg:text-9xl font-extrabold">404</h1>
        <p className="text-xl lg:text-2xl">
          The page you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
      <Link
        href="/"
        className="px-4 py-2 bg-accent text-accent-foreground text-sm lg:text-base rounded-md backdrop-blur-2xl flex items-center gap-2"
      >
        Go to Home <SquareArrowOutUpRight size={14} />
      </Link>
    </div>
  );
};

export default NotFound;
