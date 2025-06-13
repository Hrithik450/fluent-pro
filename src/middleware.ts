import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const { pathname } = request.nextUrl;
  const isAuthPath =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");

  if (!token && !isAuthPath) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  if (token && isAuthPath) {
    switch (token.role) {
      case "superAdmin":
        return NextResponse.redirect(new URL("/a/dashboard", request.nextUrl));

      case "teacher":
        return NextResponse.redirect(new URL("/t/dashboard", request.nextUrl));

      case "student":
        return NextResponse.redirect(new URL("/", request.nextUrl));

      default:
        break;
    }
  }

  if (token && token.role !== "superAdmin" && pathname.startsWith("/a")) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (
    token &&
    token.role === "student" &&
    (pathname.startsWith("/a") || pathname.startsWith("/t"))
  ) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
