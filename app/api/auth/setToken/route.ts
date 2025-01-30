import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 400 });
  }

  const res = NextResponse.json({ message: "Token set successfully" });
  res.cookies.set("firebaseToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    domain: process.env.NODE_ENV === "production" 
      ? ".vercel.app" 
      : "localhost",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 
  });

  return res;
}
