"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { Link2, Menu } from "lucide-react";
import MobileNav from "./mobileNav";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";

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

const Header = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="w-full container mx-auto flex items-center justify-between px-4 py-3 rounded-xl backdrop-blur-md">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-xl font-bold">shakerullah</h3>

        <nav className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive
                      ? "text-accent-foreground bg-accent"
                      : "text-secondary-foreground hover:text-accent-foreground hover:bg-accent"
                  } text-sm font-semibold px-3 py-1 cursor-pointer rounded-md`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <ModeToggle />

          <Link href="/contact">
            <Button className="flex items-end">
              Let's connect
              <Link2 />
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ModeToggle />

          <button
            onClick={() => setIsMobileOpen(true)}
            className={`${isMobileOpen ? "hidden" : "block"} lg:hidden`}
          >
            <Menu />
          </button>
        </div>
        <MobileNav
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
      </div>
    </header>
  );
};

export default Header;
