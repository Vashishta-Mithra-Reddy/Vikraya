import AuctionCard from "@/components/AuctionCard"

export default function AuctionsPage() {
  const auctions = [
    {
      id: "1",
      cropName: "Wheat",
      location: "Punjab, India",
      grade: "A+",
      currentBid: "5000",
      images: ["https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO", "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO"],
      endDate: "2025-02-15T18:30:00.000Z",
      quantity: "1000",
      unit: "kg",
    },
    {
      id: "2",
      cropName: "Rice",
      location: "Karnataka, India",
      grade: "B",
      currentBid: "3000",
      images: ["https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO", "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO"],
      endDate: "2025-02-20T15:00:00.000Z",
      quantity: "800",
      unit: "kg",
    },
    {
      id: "3",
      cropName: "Maize",
      location: "Maharashtra, India",
      grade: "A",
      currentBid: "4500",
      images: ["https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO", "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO"],
      endDate: "2025-02-18T12:00:00.000Z",
      quantity: "1200",
      unit: "kg",
    },
    {
      id: "4",
      cropName: "Soybean",
      location: "Madhya Pradesh, India",
      grade: "B+",
      currentBid: "6000",
      images: ["https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO", "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO"],
      endDate: "2025-02-22T09:00:00.000Z",
      quantity: "900",
      unit: "kg",
    },
    {
      id: "5",
      cropName: "Cotton",
      location: "Gujarat, India",
      grade: "A",
      currentBid: "8000",
      images: ["https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO", "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO"],
      endDate: "2025-02-25T14:30:00.000Z",
      quantity: "500",
      unit: "kg",
    },
    {
      id: "6",
      cropName: "Sugarcane",
      location: "Uttar Pradesh, India",
      grade: "B",
      currentBid: "2500",
      images: ["https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO", "https://o4jmgn9583.ufs.sh/f/isrfe0CRqzCMKllxRke0Z7YIwT3CG9l8qB5nDUmeJEX6igWO"],
      endDate: "2025-02-28T11:00:00.000Z",
      quantity: "2000",
      unit: "kg",
    },
  ]

  return (
    <div className="container mx-auto px-4 wrapper">
      <h1 className="text-4xl font-bold text-center my-8">Active Auctions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} {...auction} />
        ))}
      </div>
    </div>
  )
}

