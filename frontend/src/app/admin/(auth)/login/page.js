"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/verify-token`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        if (data.success) router.push("/admin/dashboard");
      } catch (err) {
        console.log("Not logged in");
      }
    };
    checkAuth();
  }, [router]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to login");
      }

      const result = await res.json();
      if (!result.success) throw new Error(result.message || "Login failed");

      reset();
      router.push("/admin/dashboard");
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  return (
    <div className="w-full h-[100vh]">
      <div className="max-w-[600px] h-full flex items-center justify-center mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 bg-card p-6 rounded-md"
        >
          <div className="grid gap-4">
            <label className="flex flex-col font-semibold">
              Username
              <input
                type="text"
                {...register("username")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
            <label className="flex flex-col font-semibold">
              Password
              <input
                type="password"
                {...register("password")}
                className="bg-input/40 px-3 pt-1 pb-1.5 font-normal rounded-md border border-border"
              />
            </label>
          </div>

          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
