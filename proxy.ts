/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const AUTH_PAGES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/on-boarding",
];

const LOCALES = routing.locales;

/**
 * /en/login -> /login
 */
function stripLocale(pathname: string) {
  const segments = pathname.split("/");
  if (LOCALES.includes(segments[1] as any)) {
    return "/" + segments.slice(2).join("/");
  }
  return pathname;
}

function getLocale(pathname: string) {
  const segment = pathname.split("/")[1];
  return LOCALES.includes(segment as any) ? segment : routing.defaultLocale;
}

export function proxy(req: NextRequest) {
  console.log("🔥 MIDDLEWARE HIT:", req.nextUrl.pathname);
  const intlResponse = intlMiddleware(req);

  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token_working_app")?.value;

  const locale = getLocale(pathname);
  const cleanPath = stripLocale(pathname);

  if (cleanPath === "/admin") {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/admin/dashboard`;
    return NextResponse.redirect(url);
  }

  const isAuthPage = AUTH_PAGES.some((p) => cleanPath.startsWith(p));

  if (!token && !isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/on-boarding`;
    url.searchParams.set("redirect", cleanPath);
    return NextResponse.redirect(url);
  }

  if (token && isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  return intlResponse ?? NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|icons|api).*)"],
};
