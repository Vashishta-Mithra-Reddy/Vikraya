"use client"

import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import AuctionCard from "@/components/AuctionCard";
import Loading from "../loading";

// Define the auction type
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


          // Combine auction and bid data
          return {
            id: auction.auctionId || auctionDoc.id,
            cropName: auction.cropName,
            location: auction.location,
            grade: auction.grade,
            currentBid: currentBid, 
            images: auction.images || [],
            endDate: auction.endDate,
            quantity: auction.quantity,
            unit: auction.unit
          };
        });

        const auctionData = await Promise.all(auctionDataPromises);
        setAuctions(auctionData);
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
    <div className="container mx-auto px-4 wrapper">
      <h1 className="text-4xl font-bold text-left my-8 mb-12">Auctions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} {...auction} />
        ))}
      </div>
    </div>
  );
}
