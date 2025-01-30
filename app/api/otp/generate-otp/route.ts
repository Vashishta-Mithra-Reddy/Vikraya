import { NextResponse } from "next/server";
import * as admin from "@/utils/firebaseAdmin"; 
import crypto from "crypto"; 
import nodemailer from "nodemailer"; 

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  try {
    const db = admin.firestore; // Access Firestore
    await db.collection("otps").doc(email).set({ otp, expiresAt });
  } catch (err) {
    console.error("Error saving OTP to Firestore:", err);
    return NextResponse.json({ error: "Failed to store OTP" }, { status: 500 });
  }

  // Send the OTP via email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail
      pass: process.env.EMAIL_PASS, // App password
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    });

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
