"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// ABI for the Auction contract
const ABI = [
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
  },
  {
    "inputs": [],
    "name": "auctionCounter",
    "outputs": [{"internalType": "uint256", type: "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

// Contract details
const CONTRACT_ADDRESS = "0xe91596b3faff58a4249be3cd0967edc9505ad906";

interface AuctionItem {
  id: number;
  cropName: string;
  minBid: bigint;
  highestBid: bigint;
  endTime: bigint;
  closed: boolean;
  farmer: string;
  highestBidder: string;
}

export default function AuctionManagement() {
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        if (!window.ethereum) {
          throw new Error("MetaMask not found");
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

        const auctionCount = await contract.auctionCounter();
        const fetchedAuctions: AuctionItem[] = [];

        for (let i = 0; i < auctionCount; i++) {
          const auction = await contract.auctions(i);
          fetchedAuctions.push({
            id: auction.id,
            cropName: auction.cropName,
            minBid: auction.minBid,
            highestBid: auction.highestBid,
            endTime: auction.endTime,
            closed: auction.closed,
            farmer: auction.farmer,
            highestBidder: auction.highestBidder
          });
        }

        setAuctions(fetchedAuctions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching auctions:", error);
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleString();
  };

  if (loading) return <div>Loading auctions...</div>;

  return (
    <div className="container mx-auto p-4 wrapper">
      <h1 className="text-4xl font-bold mb-10 mt-6">Active Auctions</h1>
      {auctions.length === 0 ? (
        <p>No auctions found.</p>
      ) : (
        auctions.map((auction) => (
          <Card key={auction.id.toString()} className="mb-4">
            <CardHeader>
              <CardTitle>{auction.cropName} Auction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Minimum Bid: {ethers.formatEther(auction.minBid)} ETH</p>
                <p>Highest Bid: {ethers.formatEther(auction.highestBid)} ETH</p>
                <p>Ends: {formatDate(auction.endTime)}</p>
                <p>Status: {auction.closed ? 'Closed' : 'Active'}</p>
                <p>Farmer: {auction.farmer}</p>
                {auction.highestBidder !== ethers.ZeroAddress && (
                  <p>Highest Bidder: {auction.highestBidder}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}