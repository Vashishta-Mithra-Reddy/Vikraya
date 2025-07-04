"use client"

import { useEffect, useState } from "react"
import { collection, doc, getDocs, getDoc } from "firebase/firestore"
import { db } from "@/utils/firebase"
import AuctionCard from "@/components/AuctionCard"
import Loading from "./loading"
import Link from "next/link"
import { ArrowRight, Leaf } from "lucide-react"

interface Auction {
  id: string
  cropName: string
  location: string
  grade: string
  currentBid: string
  images: string[]
  endDate: string
  quantity: string
  unit: string
  isCancelled?: boolean
  isPaused?: boolean
  isClosed?: boolean
}

export default function HomePage() {
  const [latestAuctions, setLatestAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const auctionsCollection = collection(db, "auctions")
        const auctionsSnapshot = await getDocs(auctionsCollection)

        const auctionDataPromises = auctionsSnapshot.docs.map(async (auctionDoc) => {
          const auction = auctionDoc.data()
          const aId = String(auction.auctionId)

          const bidDocRef = doc(db, "bids", aId)
          const bidDocSnapshot = await getDoc(bidDocRef)

          const currentBid = bidDocSnapshot.exists() ? bidDocSnapshot.data()?.bidAmount || "0" : "0"

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
            isClosed: auction.isClosed || false,
          }
        })

        const auctionData = await Promise.all(auctionDataPromises)
        setLatestAuctions(auctionData.reverse().slice(0, 3))
      } catch (error) {
        console.error("Error fetching auctions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAuctions()
  }, [])

  return (
    <main className="min-h-screen bg-white transition-colors duration-500">
      {/* Hero Section */}
      <section className="text-center py-20 sm:py-20 px-8 sm:px-4 min-h-[65vh] flex items-center justify-center sm:justify-start bg-[url('/agriculture.jpeg')] bg-cover rounded-xl sm:rounded-2xl m-8 sm:m-12 animate-in zoom-in-95 duration-1000">
        <div className="w-[95%] sm:w-auto max-w-4xl mx-auto sm:mx-0 sm:ml-10 bg-white p-8 sm:p-12 opacity-90 rounded-xl sm:rounded-2xl animate-in zoom-in-95 duration-500">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-black text-left ">
            Welcome to Vikraya
          </h1>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-600 text-left">
            Your premier platform for agricultural auctions
          </p>
          <div className="flex justify-center sm:justify-start gap-4 mb-4 flex-col sm:flex-row">
            <Link href="/auctions" className="inline-block">
              <button className="w-full sm:w-auto border-2 border-green-600 text-green-600 py-3 px-8 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300 text-lg font-semibold flex items-center justify-center">
                Browse Auctions
                <ArrowRight className="ml-2" />
              </button>
            </Link>
            <Link href="/create-auction" className="inline-block">
              <button className="w-full sm:w-auto border-2 border-green-600 bg-green-600 text-white py-3 px-8 rounded-lg hover:bg-green-700 hover:border-green-700 transition-all duration-300 text-lg font-semibold">
                Create Auction
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Auctions Section */}
      <section className="pb-16 pt-10 px-4 bg-white wrapper">
        <div className="max-w-full mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-green-800 flex items-center justify-center animate-in slide-in-from-bottom-8 duration-500">
            <Leaf className="mr-3 animate-bounce" />
            Latest Listings
          </h2>

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-around place-items-center animate-in zoom-in-95 duration-700">
            {latestAuctions.map((auction) => (
              <AuctionCard
                key={auction.id}
                {...auction}
                className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white animate-in zoom-in-95 duration-700"
              />
            ))}
          </div>
        

          <div className="text-center mt-12">
            <Link href="/auctions" className="inline-block">
              <button className="border-2 border-green-600 text-green-600 py-2 px-6 mb-8 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300 active:scale-95">
                View All Auctions
              </button>
            </Link>
          </div>
        </div>
      </section>

      
    </main>
  )
}

