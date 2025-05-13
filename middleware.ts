// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";

const AUTH_SECRET = process.env.NEXTAUTH_SECRET; 

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: AUTH_SECRET });
  const isAuthenticated = !!token; 

  const pathname = req.nextUrl.pathname;

  if (pathname === '/' && isAuthenticated) {
    const dashboardUrl = new URL('/dashboard/home', req.url)
    return NextResponse.redirect(dashboardUrl)
  }

  if (pathname.startsWith("/dashboard")) {
    const token = await getToken({ req, secret: AUTH_SECRET });

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/cron/:path*", "/dashboard/:path*"],
};
