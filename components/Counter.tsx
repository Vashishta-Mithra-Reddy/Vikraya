"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Counter: React.FC = () => {
  const [auctionId, setAuctionId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuctionId = async () => {
      try {
        const docRef = doc(db, "auction_counter", "counter"); // Collection: "auction counter", Document: "counter"
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setAuctionId(data?.auction_id ?? "No auction_id found");
        } else {
          setError("Document does not exist");
        }
      } catch (err) {
        console.error("Error fetching auction_id:", err);
        setError("Failed to fetch auction_id");
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionId();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto mt-6 p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Auction Counter</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          "Loading..." 
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-gray-700">
            <span className="font-bold">Auction ID:</span> {auctionId}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default Counter;
