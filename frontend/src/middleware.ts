import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");

  const protectedRoutes = ["/add", "/profile", "/settings"];

  const isProtected = protectedRoutes.includes(pathname) || isDashboardRoute;

  if (!refreshToken && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (refreshToken && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add",
    "/dashboard/:path*",
    "/profile",
    "/settings",
    "/login",
    "/signup",
  ],
};
