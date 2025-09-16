"use client";

import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const DashboardHeader = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        router.push("/admin/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Couldn't log out", error);
    }
  };

  return (
    <header className="w-full container mx-auto flex items-center justify-end pl-20 pr-4 py-3 rounded-xl backdrop-blur-md">
      <div className="flex gap-2">
        <ModeToggle />

        <Button onClick={handleLogout} className="flex items-end">
          Logout
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
