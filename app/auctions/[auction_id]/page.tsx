"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface AuctionData {
  id: string;
  cropName: string;
  location: string;
  grade: string;
  currentBid: string;
  images: string[];
}

const AuctionDetails = () => {
  const { auction_id } = useParams();
  const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        const response = await fetch(`/api/auctions/${auction_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch auction data');
        }
        const data = await response.json();
        setAuctionData(data);
      } catch (error) {
        console.error("Failed to fetch auction data:", error);
      }
    };

    if (auction_id) {
      fetchAuctionData();
    }
  }, [auction_id]);

  const handlePlaceBid = async () => {
    if (!bidAmount) {
      alert("Please enter a bid amount.");
      return;
    }

    try {
      const response = await fetch(`/api/auctions/${auction_id}/bid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bidAmount }),
      });

      if (response.ok) {
        alert("Bid placed successfully!");
        setBidAmount("");
      } else {
        alert("Failed to place bid.");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  if (!auctionData) {
    return <div>Loading...</div>;
  }

  const { cropName, location, grade, currentBid, images } = auctionData;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Card>
        <CardContent>
          <Carousel className="w-full h-64">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image}
                    alt={`${cropName} image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-md"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md" />
                <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md" />
              </>
            )}
          </Carousel>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{cropName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Location:</span> {location}
            </p>
            <p>
              <span className="font-semibold">Grade:</span>{" "}
              <Badge className="bg-green-500 text-white">{grade}</Badge>
            </p>
            <p>
              <span className="font-semibold">Current Bid:</span> {currentBid} ETH
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Place Your Bid</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="number"
            placeholder="Enter your bid amount (ETH)"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handlePlaceBid}>
            Submit Bid
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuctionDetails;