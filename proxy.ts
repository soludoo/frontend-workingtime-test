import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PAGES = ["/login", "/register", "/forgot-password"];

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token_working_app")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  if (!token && !isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|icons|api).*)"],
};
