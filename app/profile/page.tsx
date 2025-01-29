"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import toast from "react-hot-toast";
import { db, auth } from "@/utils/firebase";
import { useAuth } from "@/context/AuthContext";
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { OtpComponent } from "@/components/OtpHandler";

const ProfilePage = () => {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [currentAction, setCurrentAction] = useState<{ type: "pause" | "cancel" | "close"; auctionId: string } | null>(null);
  const [merchantEmail, setMerchantEmail] = useState<string | null>(null);
  // const user = auth.currentUser;
  const { user } = useAuth();

  const contractAddress = "0x8C44598b53C5CafC5fa437Ee360aA6BF6C70F3ee";
  const abi = [
    {
      inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
      name: "pauseAuction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
      name: "cancelAuction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
      name: "closeAuction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  useEffect(() => {
    const fetchUserAuctions = async () => {
      try {
        
        // const { user } = useAuth();
        if (!user) {
          // toast.error("User not authenticated.");
          return;
        }
  
        const userId = user.uid;
        const q = query(collection(db, "auctions"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        
        const userAuctions = [];
        for (const docSnapshot of querySnapshot.docs) {
          const highestBid = "0"
          const auction = { id: docSnapshot.id, ...docSnapshot.data(),highestBid };
  
          // Fetch current bid from bids/{auctionId}
          const bidDocRef = doc(db, "bids", docSnapshot.id);
          const bidDoc = await getDoc(bidDocRef);
          if (bidDoc.exists()) {
            auction.highestBid = bidDoc.data()?.bidAmount || 0; // Default to 0 if no bidAmount exists
          } else {
            auction.highestBid = "No bids yet"; // Handle no bids case
          }
  
          userAuctions.push(auction);
        }
  
        setAuctions(userAuctions);
      } catch (error) {
        console.error("Error fetching auctions:", error);
        toast.error("Failed to fetch auctions.");
      }
    };
  
    fetchUserAuctions();
  }, [user]);
  

  const handleAuctionAction = async (auctionId: string, action: "pause" | "cancel" | "close") => {
    setCurrentAction({ type: action, auctionId });

    if (action === "close") {
      const bidDocRef = doc(db, "bids", auctionId);
      const bidDoc = await getDoc(bidDocRef);
      if (bidDoc.exists()) {
        setMerchantEmail(bidDoc.data().userEmail);
      } else {
        toast.error("No bids found for this auction.");
        return;
      }
    }

    setShowOtpModal(true);
  };

  const performActionAfterOtpVerification = async () => {
    if (!currentAction) return;

    setLoading(true);
    try {
      if (!window.ethereum) throw new Error("Metamask is not installed");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      let tx;
      if (currentAction.type === "pause") {
        tx = await contract.pauseAuction(currentAction.auctionId);
      } else if (currentAction.type === "cancel") {
        tx = await contract.cancelAuction(currentAction.auctionId);
      } else if (currentAction.type === "close") {
        tx = await contract.closeAuction(currentAction.auctionId);
      }

      await tx.wait();

      const auctionRef = doc(db, "auctions", currentAction.auctionId);
      await updateDoc(auctionRef, {
        [`is${currentAction.type.charAt(0).toUpperCase() + currentAction.type.slice(1)}d`]: true,
      });

      toast.success(`Action successfully.`);
      setAuctions((prev) => prev.filter((auction) => auction.id !== currentAction.auctionId));
    } catch (error: any) {
      console.error(`Error performing ${currentAction.type} on auction:`, error);
      toast.error(`Failed to ${currentAction.type} auction: ${error.message}`);
    } finally {
      setLoading(false);
      setShowOtpModal(false);
      setCurrentAction(null);
    }
  };

  const closeOtpModal = () => {
    setShowOtpModal(false);
    setCurrentAction(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen text-black p-6 mt-10 wrapper">
      <h1 className="text-4xl font-bold mb-6">Your Auctions</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {auctions.map((auction) => {
          const isEndDatePassed = new Date(auction.endDate) < new Date();
          return (
            <Card key={auction.id} className="max-w-sm w-full overflow-hidden">
              <div className="relative h-48">
                <img
                  src={auction.images}
                  alt={auction.cropName}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-green-500 text-white text-sm font-bold px-2 py-1">
                  Grade: {auction.grade}
                </Badge>
              </div>

              <CardContent className="pt-4 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{auction.cropName}</h3>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 text-sm border-blue-300 px-3 py-1">
                    Ξ {auction.highestBid || "No bids yet"}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-semibold">Quantity:</span> {auction.quantity} {auction.unit}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span> {auction.location}
                  </p>
                  <p>
                    <span className="font-semibold">Ends on:</span> {formatDate(auction.endDate)}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="pt-2 pb-4">
                <div className="flex w-full flex-col m-3 gap-2">
                  {!auction.isPaused && !auction.isCancelled && !auction.isClosed && !isEndDatePassed && (
                    <Button
                      variant="outline"
                      disabled={loading}
                      onClick={() => handleAuctionAction(auction.id, "pause")}
                    >
                      Pause Auction
                    </Button>
                  )}
                  {!auction.isCancelled && !auction.isClosed && !isEndDatePassed &&(
                    <Button
                      variant="destructive"
                      disabled={loading}
                      onClick={() => handleAuctionAction(auction.id, "cancel")}
                    >
                      Cancel Auction
                    </Button>
                  )}
                  {(auction.isPaused || isEndDatePassed) && !auction.isClosed && !auction.isCancelled && (
                    <Button
                      disabled={loading}
                      onClick={() => handleAuctionAction(auction.id, "close")}
                    >
                      Close Auction
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          );
        })}

        {auctions.length === 0 && (
          <p className="text-center text-gray-500">You have no active auctions.</p>
        )}
      </div>

      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <OtpComponent
            email={(currentAction?.type === "close" ? merchantEmail : auth.currentUser?.email) || ""}
            onVerified={performActionAfterOtpVerification}
            onClose={closeOtpModal}
            className="rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
