import { verifyJWT } from "@lib/jwt";
import { jwtVerify } from "jose";
import { MiddlewareConfig } from "next/dist/build/analysis/get-page-static-info";
import { NextRequest, NextResponse } from "next/server";
const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/signin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/signup") {
    return NextResponse.redirect(new URL("/register", request.url));
  }

  const jwt = request.cookies.get(process.env.COOKIE_NAME!);
  if (!jwt) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
