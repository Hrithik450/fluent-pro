import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Cookies in request:", request.cookies.getAll());
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;
  const isAuthPath =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");

  console.log("MIDDLEWARE HIT →", { pathname });
  console.log("Token found:", !!token);
  if (token) {
    console.log("Token role:", token.role);
  }

  if (!token && !isAuthPath) {
    console.log(
      "No token and accessing protected route. Redirecting to /signin"
    );
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  if (token && isAuthPath) {
    console.log(
      "User is already logged in and visiting auth path. Redirecting based on role..."
    );
    switch (token.role) {
      case "superAdmin":
        console.log("Redirecting superAdmin to /a/dashboard");
        return NextResponse.redirect(new URL("/a/dashboard", request.nextUrl));
      case "teacher":
        console.log("Redirecting teacher to /t/dashboard");
        return NextResponse.redirect(new URL("/t/dashboard", request.nextUrl));
      case "student":
        console.log("Redirecting student to /");
        return NextResponse.redirect(new URL("/", request.nextUrl));
      default:
        console.warn("Unknown role. Not redirecting.");
        break;
    }
  }

  if (token && token.role !== "superAdmin" && pathname.startsWith("/a")) {
    console.log("Non-superAdmin trying to access /a route. Redirecting to /");
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (
    token &&
    token.role === "student" &&
    (pathname.startsWith("/a") || pathname.startsWith("/t"))
  ) {
    console.log(
      "Student trying to access admin/teacher route. Redirecting to /"
    );
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  console.log("No redirects. Proceeding to next middleware or page.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
