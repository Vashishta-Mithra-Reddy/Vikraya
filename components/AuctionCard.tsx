"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useRouter } from "next/navigation"

interface AuctionCardProps {
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
  className?: string
}

const AuctionCard: React.FC<AuctionCardProps> = (props) => {
  const { 
    id, 
    cropName, 
    location, 
    grade, 
    currentBid, 
    images, 
    endDate, 
    quantity, 
    unit,
    isCancelled,
    isPaused,
    isClosed,
    className 
  } = props

  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const hasEnded = new Date(endDate) < new Date()
  const isDisabled = isCancelled || isPaused || isClosed || hasEnded

  // Determine status message for button
  let statusMessage = ''
  if (isCancelled) statusMessage = 'Auction Cancelled'
  else if (isPaused) statusMessage = 'Auction Paused'
  else if (isClosed) statusMessage = 'Auction Closed'
  else if (hasEnded) statusMessage = 'Auction Ended'

  const handlePlaceBid = () => {
    if (!isDisabled) {
      router.push(`/auctions/${id}`)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  return (
    <Card className={`max-w-sm w-full overflow-hidden relative ${className || ''}`}>
      {/* Status Badge */}
      {isDisabled && (
        <div className="absolute top-3 left-3 z-10">
          {isCancelled && (
            <Badge className="bg-red-500 text-white text-sm font-bold px-2 py-1">
              Cancelled
            </Badge>
          )}
          {isPaused && !isCancelled && (
            <Badge className="bg-yellow-500 text-white text-sm font-bold px-2 py-1">
              Paused
            </Badge>
          )}
          {isClosed && !isCancelled && !isPaused && (
            <Badge className="bg-gray-500 text-white text-sm font-bold px-2 py-1">
              Closed
            </Badge>
          )}
          {hasEnded && !isCancelled && !isPaused && !isClosed && (
            <Badge className="bg-gray-500 text-white text-sm font-bold px-2 py-1">
              Ended
            </Badge>
          )}
        </div>
      )}

      {/* Carousel Section */}
      <div className="relative h-48">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${cropName} image ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white" />
              <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white" />
            </>
          )}
        </Carousel>
        <Badge className="absolute top-3 right-3 bg-green-500 text-white text-sm font-bold px-2 py-1">
          Grade: {grade}
        </Badge>
      </div>

      {/* Card Content */}
      <CardContent className="pt-4 pb-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{cropName}</h3>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 text-sm border-blue-300 px-3 py-1">
            Ξ {currentBid}
          </Badge>
        </div>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-semibold">Quantity:</span> {quantity} {unit}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {location}
          </p>
          <p>
            <span className="font-semibold">Ends on:</span> {formatDate(endDate)}
          </p>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="pt-2 pb-4">
        <Button 
          className={`w-full text-white ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'}`}
          onClick={handlePlaceBid}
          disabled={isDisabled}
        >
          {isDisabled ? statusMessage : 'Place a Bid'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AuctionCard