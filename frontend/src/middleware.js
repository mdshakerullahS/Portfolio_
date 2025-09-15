import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
      headers: {
        cookie: `token=${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
