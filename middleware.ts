import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("firebaseToken");

  const currentPath = req.nextUrl.pathname;
  const signinUrl = new URL(`/signin?redirect=${encodeURIComponent(currentPath)}`, req.url);

  if (!token) {
    return NextResponse.redirect(signinUrl);
  }

  try {
    const apiUrl = new URL("/api/auth/verify-token", req.url);

    const res = await fetch(apiUrl.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token.value }),
    });

    if (!res.ok) {
      return NextResponse.redirect(signinUrl);
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware auth error:", err);
    return NextResponse.redirect(signinUrl);
  }
}

export const config = {
  matcher: ["/create-auction", "/profile"],
};