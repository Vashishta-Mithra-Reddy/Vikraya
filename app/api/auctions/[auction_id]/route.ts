import { type NextRequest, NextResponse } from "next/server"

const auctions = [
  {
    id: "1",
    cropName: "Wheat",
    location: "Punjab, India",
    grade: "A+",
    currentBid: "0.5",
    images: ["https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO"],
  },
  {
    id: "2",
    cropName: "Rice",
    location: "Karnataka, India",
    grade: "B",
    currentBid: "0.3",
    images: [
      "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO",
      "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO",
    ],
  },
  {
    id: "3",
    cropName: "Wheat",
    location: "Punjab, India",
    grade: "A+",
    currentBid: "0.5",
    images: [
      "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO",
      "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO",
    ],
  },
  {
    id: "4",
    cropName: "Rice",
    location: "Karnataka, India",
    grade: "B",
    currentBid: "0.3",
    images: [
      "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO",
      "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO",
    ],
  },
  {
    id: "5",
    cropName: "Wheat",
    location: "Punjab, India",
    grade: "A+",
    currentBid: "0.5",
    images: [
      "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO",
      "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO",
    ],
  },
  {
    id: "6",
    cropName: "Rice",
    location: "Karnataka, India",
    grade: "B",
    currentBid: "0.3",
    images: [
      "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO",
      "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO",
    ],
  },
]

export async function GET(request: NextRequest, context: { params: { auction_id: string } }) {
  const { auction_id } = await context.params

  console.log("Received auction_id:", auction_id)

  // Find the auction based on the auction_id
  const auction = auctions.find((a) => a.id === auction_id)

  if (!auction) {
    console.log("No auction found for ID:", auction_id)
    return NextResponse.json({ error: "Auction not found" }, { status: 404 })
  }

  return NextResponse.json(auction)
}

