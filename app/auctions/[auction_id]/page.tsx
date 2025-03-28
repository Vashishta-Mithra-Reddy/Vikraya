'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { db } from '@/utils/firebase'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import MakeBid from '@/components/MakeBid'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import Loading from './loading'
import { Clock, MapPin, Leaf, BarChart3, Package, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

interface AuctionData {
  id: string
  cropName: string
  location: string
  grade: string
  currentBid: string
  images: string[]
  endDate?: string
  quantity?: string
  unit?: string
  isCancelled?: boolean
  isPaused?: boolean
  isClosed?: boolean
  minBid?: string // Add minBid to interface
}

const AuctionDetails = () => {
  const { auction_id } = useParams()
  const [auctionData, setAuctionData] = useState<AuctionData | null>(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth()
  const user = auth.currentUser
  const userEmail = user?.email || ""

  useEffect(() => {
    let unsubscribe: () => void

    const setupAuctionListener = async () => {
      if (!auction_id) return

      try {
        // Initial fetch
        const auctionDocRef = doc(db, 'auctions', String(auction_id))
        const bidDocRef = doc(db, "bids", String(auction_id))

        // Real-time listeners
        unsubscribe = onSnapshot(auctionDocRef, async (auctionDoc) => {
          if (auctionDoc.exists()) {
            const auctionData = auctionDoc.data()
            const bidDocSnapshot = await getDoc(bidDocRef)
            const currentBid = bidDocSnapshot.exists() ? bidDocSnapshot.data()?.bidAmount || "0" : "0"

            setAuctionData({
              id: auctionDoc.id,
              cropName: auctionData.cropName,
              location: auctionData.location,
              grade: auctionData.grade,
              currentBid: currentBid,
              images: auctionData.images || [],
              endDate: auctionData.endDate,
              quantity: auctionData.quantity,
              unit: auctionData.unit,
              isCancelled: auctionData.isCancelled,
              isPaused: auctionData.isPaused,
              isClosed: auctionData.isClosed,
              minBid: auctionData.minBid || "1", // Add minBid from Firestore
            })
          }
          setLoading(false)
        })
      } catch (error) {
        console.error('Failed to fetch auction data:', error)
        setLoading(false)
      }
    }

    setupAuctionListener()
    return () => unsubscribe?.()
  }, [auction_id])

  if (loading) return <Loading />
  if (!auctionData) return <div className="text-center py-10">Auction not found</div>

  const isAuctionActive = !(auctionData.isCancelled || auctionData.isPaused || auctionData.isClosed)
  const timeRemaining = auctionData.endDate ? new Date(auctionData.endDate).getTime() - new Date().getTime() : 0
  const isExpired = timeRemaining <= 0

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Status Banner */}
        {(!isAuctionActive || isExpired) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  {isExpired ? "This auction has ended" : 
                   auctionData.isCancelled ? "This auction has been cancelled" :
                   auctionData.isPaused ? "This auction is currently paused" :
                   auctionData.isClosed ? "This auction is closed" : ""}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden h-fit"
          >
            <Carousel className="w-full">
              <CarouselContent>
                {auctionData.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full">
                      <img
                        src={image}
                        alt={`${auctionData.cropName} image ${index + 1}`}
                        className="w-full h-auto max-h-[600px] object-contain mx-auto"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {auctionData.images.length > 1 && (
                <>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </>
              )}
            </Carousel>
          </motion.div>

          {/* Auction Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800">
                  {auctionData.cropName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span className="text-gray-600">{auctionData.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Grade {auctionData.grade}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-green-600" />
                    <span className="text-gray-600">
                      {auctionData.quantity} {auctionData.unit}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-lg text-gray-900">
                      {auctionData.currentBid} ETH
                    </span>
                  </div>
                  {/* Add minimum bid information */}
                  <div className="flex items-center space-x-2 col-span-2">
                    <div className="bg-blue-50 p-2 rounded-lg w-full">
                      <p className="text-blue-800 text-sm">
                        <span className="font-medium">Minimum Bid:</span> {auctionData.minBid} ETH
                      </p>
                    </div>
                  </div>
                </div>

                {auctionData.endDate && (
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Auction Ends On</span>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-800 font-medium">
                        {formatDate(auctionData.endDate)}
                      </p>
                      {timeRemaining > 0 && (
                        <p className="text-sm text-green-600 mt-1">
                          {Math.floor(timeRemaining / (1000 * 60 * 60 * 24))} days remaining
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bidding Section */}
            {isAuctionActive && !isExpired && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <MakeBid auctionId={String(auction_id)} userEmail={userEmail} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default AuctionDetails
