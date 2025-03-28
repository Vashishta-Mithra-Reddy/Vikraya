"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { db } from "@/utils/firebase"; // Adjust based on your Firebase setup
import { doc, setDoc } from "firebase/firestore";

interface MakeBidProps {
  auctionId: string;
  userEmail: string; 
}

const MakeBid: React.FC<MakeBidProps> = ({ auctionId, userEmail }) => {
  const [bidAmount, setBidAmount] = useState<string>("");
  const [highestBid, setHighestBid] = useState<string>("0");
  const [minBid, setMinBid] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);

  // Smart contract details
  const contractAddress = "0x8C44598b53C5CafC5fa437Ee360aA6BF6C70F3ee";
  const abi = [
    {
      "inputs":[{"internalType": "uint256",name: "_id",type: "uint256"}],
      "name": "placeBid",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "uint256", name: "", type: "uint256" }],
      "name": "auctions",
      "outputs": [
        {"internalType": "uint256", name: "id", type: "uint256"},
        {"internalType": "address", name: "farmer", type: "address"},
        {"internalType": "string", name: "cropName", type: "string"},
        {"internalType": "uint256", name: "minBid", type: "uint256"},
        {"internalType": "uint256", name: "highestBid", type: "uint256"},
        {"internalType": "address", name: "highestBidder", type: "address"},
        {"internalType": "uint256", name: "endTime", type: "uint256"},
        {"internalType": "bool", name: "closed", type: "bool"}
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        if (!window.ethereum) throw new Error("Metamask is not installed");

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);

        const auction = await contract.auctions(Number(auctionId));
        const currentHighestBid = ethers.formatEther(auction.highestBid);
        const minimumBid = ethers.formatEther(auction.minBid);
        
        setHighestBid(currentHighestBid);
        setMinBid(minimumBid);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching auction data");
      }
    };

    fetchAuctionData();
  }, [auctionId]);

  const handlePlaceBid = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!window.ethereum) throw new Error("Metamask is not installed");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Convert bid amount to wei
      const bidAmountWei = ethers.parseEther(bidAmount);

      // Place bid transaction
      const tx = await contract.placeBid(auctionId, { value: bidAmountWei });
      await tx.wait();

      // Store bid in Firestore
      const bidDocRef = doc(db, "bids", auctionId);
      await setDoc(bidDocRef, {
        bidAmount: bidAmount,
        userEmail: userEmail,
        timestamp: new Date(),
      });

      toast.success("Bid placed successfully!");
      setBidAmount("");
    } catch (err: any) {
      console.error(err);
      toast.error(`Error placing bid: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Determine the effective minimum bid (either minBid or highestBid, whichever is higher)
  const effectiveMinBid = parseFloat(highestBid) > parseFloat(minBid) 
    ? highestBid 
    : minBid;

  return (
    <Card className="max-w-3xl mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Place Bid</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePlaceBid} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bidAmount">Bid Amount (ETH)</Label>
            <Input
              id="bidAmount"
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder={`Min: ${effectiveMinBid} ETH`}
              min={effectiveMinBid}
              step="0.001"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading || !bidAmount || parseFloat(bidAmount) <= parseFloat(effectiveMinBid)}
          >
            {loading ? "Placing Bid..." : "Place Bid"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MakeBid;
