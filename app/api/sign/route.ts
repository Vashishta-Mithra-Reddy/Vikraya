import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";

const privateKey = process.env.PRIVATE_KEY as string;
const backendWallet = new ethers.Wallet(privateKey);

export async function POST(req: NextRequest) {
  try {
    const { auctionId, userAddress } = await req.json();

    if (!auctionId || !userAddress) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const message = `Authorize closing auction ${auctionId} for ${userAddress}`;
    
    const signature = await backendWallet.signMessage(message);

    return NextResponse.json({ message, signature, signer: backendWallet.address });
  } catch (error) {
    console.error("Signing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
