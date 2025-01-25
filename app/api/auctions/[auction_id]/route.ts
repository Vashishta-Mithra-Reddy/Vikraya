import { NextResponse } from "next/server";

// Sample data for auctions
const auctions = [
    {
      id: "1",
      cropName: "Wheat",
      location: "Punjab, India",
      grade: "A+",
      currentBid: "0.5",
      images: [
        "wheat.jpg",
      ],
    },
    {
      id: "2",
      cropName: "Rice",
      location: "Karnataka, India",
      grade: "B",
      currentBid: "0.3",
      images: [
        "wheat.jpg",
        "wheat.jpg",
      ],
    },
    {
        id: "3",
        cropName: "Wheat",
        location: "Punjab, India",
        grade: "A+",
        currentBid: "0.5",
        images: [
          "https://example.com/wheat1.jpg",
          "https://example.com/wheat2.jpg",
        ],
      },
      {
        id: "4",
        cropName: "Rice",
        location: "Karnataka, India",
        grade: "B",
        currentBid: "0.3",
        images: [
          "https://example.com/rice1.jpg",
          "https://example.com/rice2.jpg",
        ],
      },
      {
        id: "5",
        cropName: "Wheat",
        location: "Punjab, India",
        grade: "A+",
        currentBid: "0.5",
        images: [
          "https://example.com/wheat1.jpg",
          "https://example.com/wheat2.jpg",
        ],
      },
      {
        id: "6",
        cropName: "Rice",
        location: "Karnataka, India",
        grade: "B",
        currentBid: "0.3",
        images: [
          "https://example.com/rice1.jpg",
          "https://example.com/rice2.jpg",
        ],
      },
  ];

export async function GET(request: Request, context: { params: { auction_id: string } }) {
    const { auction_id } = await context.params;  // Await the context.params
    console.log("Received auction_id:", auction_id);
    console.log("Available auctions:", auctions);

    const auction = auctions.find(a => a.id === auction_id);
    
    if (!auction) {
        console.log("No auction found for ID:", auction_id);
        return NextResponse.json({ error: "Auction not found" }, { status: 404 });
    }
    
    return NextResponse.json(auction);
}
