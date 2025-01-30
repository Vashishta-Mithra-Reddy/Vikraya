'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/utils/firebase'; 
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import MakeBid from '@/components/MakeBid';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Loading from './loading';

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
  const [bidAmount, setBidAmount] = useState('');
  const auth = getAuth()
  const user = auth.currentUser
  const userEmail = user?.email || "";



  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        if (!auction_id) return;

        const auctionDocRef = doc(db, 'auctions', String(auction_id));
        const auctionDocSnap = await getDoc(auctionDocRef);

        if (auctionDocSnap.exists()) {
          const auctionData = auctionDocSnap.data();
          const aId = String(auction_id);

          const bidDocRef = doc(db, "bids", aId);
          const bidDocSnapshot = await getDoc(bidDocRef);

          const currentBid = bidDocSnapshot.exists() ? bidDocSnapshot.data()?.bidAmount || "0" : "0";
          // Assuming currentBid is already available in the auction document
          setAuctionData({
            id: auctionDocSnap.id,
            cropName: auctionData.cropName,
            location: auctionData.location,
            grade: auctionData.grade,
            currentBid: currentBid || '0', 
            images: auctionData.images || [],
          });
        } else {
          console.error('Auction not found!');
        }
      } catch (error) {
        console.error('Failed to fetch auction data:', error);
      }
    };

    fetchAuctionData();
  }, [auction_id]);

  const handlePlaceBid = async () => {
    if (!bidAmount) {
      alert('Please enter a bid amount.');
      return;
    }

    try {
      const response = await fetch(`/api/auctions/${auction_id}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bidAmount }),
      });

      if (response.ok) {
        alert('Bid placed successfully!');
        setBidAmount('');
      } else {
        alert('Failed to place bid.');
      }
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  if (!auctionData) {
    return <Loading/>;
  }

  const { cropName, location, grade, currentBid, images } = auctionData;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Card className='pt-5'>
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
            <div>
              <span className="font-semibold">Location:</span> {location}
            </div>
            <div>
              <span className="font-semibold">Grade:</span>{' '}
              <Badge className="bg-green-500 text-white">{grade}</Badge>
            </div>
            <div>
              <span className="font-semibold">Current Bid:</span> {currentBid}{' '}
              ETH
            </div>
          </div>
        </CardContent>
      </Card>

      <MakeBid auctionId={String(auction_id)} userEmail={userEmail}/>
 
    </div>
  );
};

export default AuctionDetails;
