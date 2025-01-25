import { NextResponse } from 'next/server';
import { verifyIdToken } from '@/utils/firebaseAdmin'; // Make sure path is correct

export async function POST(request: Request) {
  try {
    const { token } = await request.json(); // Assuming the token is sent as JSON in the request body

    const decodedToken = await verifyIdToken(token);

    // Respond with a success message or user data
    return NextResponse.json({ decodedToken });
  } catch (err) {
    console.error("Error verifying token:", err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
