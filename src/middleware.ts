import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;
const SUBDOMAIN_MAP: Record<string, string> = {
  auto: "auto-parts",
  food: "food-markets",
  clothing: "clothing-lifestyle",
  it: "it-hardware",
  markets: "markets-trading",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/admin") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const host = request.headers.get("host") ?? "";
  const subdomain = host.split(".")[0];
  if (SUBDOMAIN_MAP[subdomain] && !pathname.startsWith("/_next")) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/divisions/${SUBDOMAIN_MAP[subdomain]}`;
    return NextResponse.rewrite(url);
  }

  const preferredLocale = detectLocale(request);

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale}`;
    const response = NextResponse.redirect(url);
    response.cookies.set("amertrading-locale", preferredLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale}${pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set("amertrading-locale", preferredLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("amertrading-locale")?.value;
  if (cookieLocale && isSupportedLocale(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(",")[0]
      ?.split("-")[0]
      ?.toLowerCase();
    if (preferred && isSupportedLocale(preferred)) {
      return preferred;
    }
  }

  return defaultLocale;
}

function isSupportedLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

