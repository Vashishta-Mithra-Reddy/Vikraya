// app/api/auth/signout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  
  response.cookies.set("firebaseToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0), 
  });

  return response;
}