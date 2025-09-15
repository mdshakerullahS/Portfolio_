import AdminSidebar from "@/components/adminSidebar";
import DashboardHeader from "@/components/dashboardHeader";
import { headers } from "next/headers";
import Link from "next/link";

export default async function AdminLayout({ children }) {
  const cookie = headers().get("cookie") || "";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
    headers: { cookie },
    cache: "no-store",
  });
  if (!res.ok) {
    return <Link href="/admin/login">Login</Link>;
  }
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
