"use client";

import { useState } from "react";
import { PanelTopClose } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Wand2,
  Briefcase,
  FolderKanban,
  Quote,
  NotebookText,
  Inbox,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Skills", icon: Wand2, href: "/admin/dashboard/skills" },
  {
    label: "Experiences",
    icon: Briefcase,
    href: "/admin/dashboard/experiences",
  },
  { label: "Projects", icon: FolderKanban, href: "/admin/dashboard/projects" },
  {
    label: "Feedbacks",
    icon: Quote,
    href: "/admin/dashboard/feedbacks",
  },
  { label: "Blogs", icon: NotebookText, href: "/admin/dashboard/blogs" },
  { label: "Inbox", icon: Inbox, href: "/admin/dashboard/inbox" },
];

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="fixed left-0 top-0 z-50">
      <aside
        className={`flex flex-col ${
          sidebarOpen ? "items-start w-[240px]" : "items-center w-[56px]"
        } h-[100vh] px-2 py-4 bg-sidebar/75 border border-sidebar-border backdrop-blur-md transition-all duration-500`}
      >
        <div
          className={`w-full flex justify-between ${!sidebarOpen && "mr-4"}`}
        >
          <h2
            className={`text-xl font-bold mb-10 px-2 ${
              !sidebarOpen && "w-0 h-0"
            } overflow-hidden`}
          >
            shakerullah
          </h2>
          <PanelTopClose
            onClick={handleSidebarOpen}
            className={`${
              sidebarOpen ? "rotate-[270deg]" : "rotate-90 mb-10"
            } cursor-pointer`}
          />
        </div>

        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <div
              key={item.label}
              className={`w-full ${
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              } hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md`}
            >
              <Link
                href={item.href}
                className="text-sidebar-foreground flex items-center gap-3 px-2 my-2 transition-all duration-500"
              >
                <div>
                  <item.icon size={20} />
                </div>
                <p
                  className={`${
                    !sidebarOpen && "w-0 translate-x-24"
                  } overflow-hidden`}
                >
                  {item.label}
                </p>
              </Link>
            </div>
          );
        })}
      </aside>
    </div>
  );
};

export default AdminSidebar;
