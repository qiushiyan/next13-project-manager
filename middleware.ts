import { verifyJWT } from "@lib/jwt";
import { jwtVerify } from "jose";
import { MiddlewareConfig } from "next/dist/build/analysis/get-page-static-info";
import { NextRequest, NextResponse } from "next/server";
const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // access the public files directly
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwt = request.cookies.get(process.env.COOKIE_NAME!);
  // if user is already logged in and tries to access login page, redirect to home page
  if (pathname.startsWith("/login")) {
    if (jwt) {
      try {
        await verifyJWT(jwt.value);
        return NextResponse.redirect(new URL("/home", request.url));
      } catch (error) {
        return NextResponse.next();
      }
    } else {
      return NextResponse.next();
    }
  }

  // aliaes for login and register
  if (pathname === "/signin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname === "/signup") {
    return NextResponse.redirect(new URL("/register", request.url));
  }

  // all other routes are protected
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
