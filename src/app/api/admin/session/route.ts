import { cookies } from "next/headers";

export async function POST() {
  // Demo-only session. Production: issue a signed, HttpOnly, Secure session
  // cookie via NextAuth and validate it in middleware.
  const cookieStore = await cookies();
  cookieStore.set("nyumba_admin_session", "admin-demo", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  return Response.json({ ok: true });
}
