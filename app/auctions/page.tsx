"use client"

import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import AuctionCard from "@/components/AuctionCard";
import Loading from "./loading";

// Updated auction type
interface Auction {
  id: string;
  cropName: string;
  location: string;
  grade: string;
  currentBid: string;
  images: string[];
  endDate: string;
  quantity: string;
  unit: string;
  isCancelled?: boolean;
  isPaused?: boolean;
  isClosed?: boolean;
}

export default function AuctionsPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const auctionsCollection = collection(db, "auctions");
        const auctionsSnapshot = await getDocs(auctionsCollection);

        const auctionDataPromises = auctionsSnapshot.docs.map(async (auctionDoc) => {
          const auction = auctionDoc.data();
          const aId = String(auction.auctionId);

          const bidDocRef = doc(db, "bids", aId);
          const bidDocSnapshot = await getDoc(bidDocRef);

          const currentBid = bidDocSnapshot.exists() ? bidDocSnapshot.data()?.bidAmount || "0" : "0";

          return {
            id: auction.auctionId || auctionDoc.id,
            cropName: auction.cropName,
            location: auction.location,
            grade: auction.grade,
            currentBid: currentBid,
            images: auction.images || [],
            endDate: auction.endDate,
            quantity: auction.quantity,
            unit: auction.unit,
            isCancelled: auction.isCancelled || false,
            isPaused: auction.isPaused || false,
            isClosed: auction.isClosed || false
          };
        });

        const auctionData = await Promise.all(auctionDataPromises);
        // Reverse the array to show latest auctions first
        setAuctions(auctionData.reverse());
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className="container mx-auto px-4 wrapper min-h-dvh">
      <h1 className="text-4xl font-bold text-left my-8 mb-12">Auctions</h1>
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {auctions.map((auction) => {
        const isAuctionExpired = auction.endDate && !isNaN(new Date(auction.endDate).getTime()) && new Date() > new Date(auction.endDate);

          return (
            <AuctionCard 
              key={auction.id} 
              {...auction}
              className={
                auction.isCancelled || auction.isPaused || auction.isClosed || isAuctionExpired
                  ? "grayscale pointer-events-none select-none" 
                  : ""
              }
            />
          );
      })}
      </div>
    </div>
  );
}