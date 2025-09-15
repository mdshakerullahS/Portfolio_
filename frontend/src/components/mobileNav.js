"use client";

import { Link2, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
];

const MobileNav = ({ isMobileOpen, setIsMobileOpen }) => {
  const pathname = usePathname();

  return (
    <>
      <div
        onClick={() => setIsMobileOpen(false)}
        className={`w-[100vw] h-[100vh] ${
          !isMobileOpen ? "hidden" : "block"
        } absolute inset-0 z-50`}
      />
      <div
        className={`bg-background p-2 lg:hidden min-w-[300px] min-h-[100vh] absolute top-[-8px] ${
          isMobileOpen ? "right-[-20px]" : "right-[-480px]"
        } z-50 transition-all duration-500`}
      >
        <div className="flex flex-col items-start gap-4 pt-0.5">
          <button onClick={() => setIsMobileOpen(false)}>
            <X />
          </button>
          <nav className="flex flex-col items-start gap-4">
            <div className="flex flex-col items-start gap-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? "text-foreground bg-muted-foreground/10"
                        : "text-foreground/80 hover:text-foreground hover:bg-muted-foreground/10"
                    } text-sm font-semibold px-3 py-1 cursor-pointer rounded-md`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        <Link href="/contact">
          <Button className="flex items-end mt-12">
            Let&apos;s connect
            <Link2 />
          </Button>
        </Link>
      </div>
    </>
  );
};

export default MobileNav;
