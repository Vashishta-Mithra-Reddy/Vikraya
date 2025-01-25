import { NextResponse } from "next/server";
import * as admin from "@/utils/firebaseAdmin"; // Import Firebase Admin

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
  }

  try {
    const db = admin.firestore; // Access Firestore
    const otpDoc = await db.collection("otps").doc(email).get();

    if (!otpDoc.exists) {
      return NextResponse.json({ error: "OTP not found or expired" }, { status: 404 });
    }

    const { otp: storedOtp, expiresAt } = otpDoc.data() as {
      otp: string;
      expiresAt: number;
    };

    if (Date.now() > expiresAt) {
      await db.collection("otps").doc(email).delete(); // Delete expired OTP
      return NextResponse.json({ error: "OTP expired" }, { status: 410 });
    }

    if (storedOtp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // OTP is valid
    await db.collection("otps").doc(email).delete(); // Optional: clean up after successful validation
    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}
