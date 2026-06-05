import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidAdminToken } from "@/lib/admin-auth";
import { updateSession } from "@/lib/supabase/middleware";

const PROTECTED_PREFIXES = ["/events", "/profile"];
const AUTH_PAGES = ["/login", "/signup"];

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/admin/analytics") &&
    !isValidAdminToken(request.cookies.get(ADMIN_COOKIE)?.value)
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.next();
  }

  const { supabaseResponse, user } = await updateSession(request);

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/signup";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (user && isAuthPage) {
    const redirect = request.nextUrl.searchParams.get("redirect") ?? "/";
    return NextResponse.redirect(new URL(redirect, request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/api/admin/analytics",
    "/events/:path*",
    "/profile",
    "/login",
    "/signup",
  ],
};
