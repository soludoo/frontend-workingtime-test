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
  const { pathname } = req.nextUrl;

  const isFromSW = req.headers.get("x-sw") === "1";

  // 🔥 1. SW requests bypass everything
  if (isFromSW) {
    return intlMiddleware(req) ?? NextResponse.next();
  }

  const token = req.cookies.get("token_working_app")?.value;

  const savedLocale = req.cookies.get("NEXT_LOCALE")?.value;
  const locale = getLocale(pathname);
  const cleanPath = stripLocale(pathname);

  // 🔥 2. Skip internal
  if (
    pathname.startsWith("/serwist") ||
    pathname.startsWith("/_next") ||
    pathname.endsWith("manifest.webmanifest")
  ) {
    return NextResponse.next();
  }

  // 🔥 3. ONLY redirect if NO locale in URL
  const hasLocale = LOCALES.includes(pathname.split("/")[1] as any);

  if (!hasLocale && savedLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${savedLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  const isAuthPage = AUTH_PAGES.some((p) => cleanPath.startsWith(p));

  // 🔥 4. Auth guard
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

  return intlMiddleware(req) ?? NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|serwist|favicon.ico|manifest.webmanifest|icons|images|.*\\..*).*)",
  ],
};
