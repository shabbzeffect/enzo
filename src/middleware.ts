import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Admin route protection.
//
// Admin routes are protected by a simple session cookie
// (nyumba_admin_session). In production, replace this with NextAuth/Auth.js
// session validation and role-based access control (only users with the
// "admin" role may access /admin).
//
// The demo session value is "admin-demo". Set the cookie by logging in at
// /admin/login. This is for demonstration only — do not use in production.
const ADMIN_SESSION_COOKIE = "nyumba_admin_session";
const DEMO_SESSION_VALUE = "admin-demo";

// Paths that require an admin session.
const ADMIN_PATH_PREFIXES = ["/admin"];

// Paths that are publicly reachable even without an admin session (login +
// the session-setting API route). Without these, the middleware would redirect
// /admin/login to itself forever.
const PUBLIC_ADMIN_PATHS = ["/admin/login", "/api/admin/session"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!ADMIN_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Allow the login page and session API without a session.
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isAdmin = session === DEMO_SESSION_VALUE;

  if (!isAdmin) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
