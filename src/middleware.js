// middleware.ts
import { NextResponse } from "next/server";
export function middleware(request) {
  const token = request.cookies.get("token");
  const pathname = request.nextUrl.pathname;
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
