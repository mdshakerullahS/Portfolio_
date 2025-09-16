"use client";

import AdminSidebar from "@/components/adminSidebar";
import DashboardHeader from "@/components/dashboardHeader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/verify-token`,
          { credentials: "include" }
        );

        if (!res.ok) router.push("/admin/login");
      } catch (error) {
        router.push("/admin/login");
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div>
      <div className="border border-sidebar-border fixed top-0 inset-x-0 z-50">
        <DashboardHeader />
      </div>
      <AdminSidebar />
      <div>
        <div className="w-full h-10 lg:h-12" />
        <div className="flex">
          <div className={`w-[60px] h-[100vh]`} />
          <main className="px-3 py-9 lg:py-6 w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
