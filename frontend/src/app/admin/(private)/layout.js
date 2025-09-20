"use client";

import AdminSidebar from "@/components/adminSidebar";
import DashboardHeader from "@/components/dashboardHeader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/verify-token`,
          { credentials: "include" }
        );

        if (!res.ok) router.push("/admin/login");
        const result = await res.json();
        if (result.success) setIsAuthenticated(true);
      } catch (error) {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  if (isAuthenticated)
    return (
      <>
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
      </>
    );
}
