"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { useRouter } from "next/navigation"
import { db } from "@/utils/firebase"
import { doc, setDoc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ImageUpload"

const CreateAuction = () => {
  const [cropName, setCropName] = useState("")
  const [minBid, setMinBid] = useState("")
  const [quantity, setQuantity] = useState("")
  const [unit, setUnit] = useState("kg")
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [location, setLocation] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Smart contract details (unchanged)
  const contractAddress = "0xe91596b3faff58a4249be3cd0967edc9505ad906"
  const abi = [
    {
      inputs: [
        { internalType: "string", name: "_cropName", type: "string" },
        { internalType: "uint256", name: "_minBid", type: "uint256" },
        { internalType: "uint256", name: "_duration", type: "uint256" },
      ],
      name: "createAuction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!window.ethereum) throw new Error("Metamask is not installed")
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      // Calculate duration in seconds
      const now = new Date()
      const durationInSeconds = endDate ? Math.floor((endDate.getTime() - now.getTime()) / 1000) : 0

      // Interact with the smart contract (unchanged)
      const contract = new ethers.Contract(contractAddress, abi, signer)
      const tx = await contract.createAuction(cropName, ethers.parseEther(minBid), durationInSeconds)

      // Wait for transaction to be mined
      await tx.wait()

      // Save auction details to Firestore (updated)
      const auctionId = tx.hash
      await setDoc(doc(db, "auctions", auctionId), {
        cropName,
        minBid,
        quantity,
        unit,
        endDate: endDate?.toISOString(),
        location,
        images,
        createdAt: new Date().toISOString(),
        transactionHash: tx.hash,
        farmerAddress: await signer.getAddress(),
      })

      alert("Auction created successfully!")
      router.push("/auctions")
    } catch (err: any) {
      console.error(err)
      alert(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-3xl mx-auto mt-10 mb-12">
      <CardHeader>
        <CardTitle className="text-2xl">Create Auction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cropName">Crop Name</Label>
            <Input
              id="cropName"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              placeholder="Enter crop name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minBid">Minimum Bid (ETH)</Label>
            <Input
              id="minBid"
              type="number"
              value={minBid}
              onChange={(e) => setMinBid(e.target.value)}
              placeholder="Enter minimum bid amount in ETH"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                required
              />
            </div>
            <div className="w-1/3 space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger id="unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="quintal">Quintals</SelectItem>
                  <SelectItem value="ton">Tons</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">Auction End Date</Label>
            <DatePicker date={endDate} setDate={setEndDate} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter auction location"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Images</Label>
            <ImageUpload images={images} setImages={setImages} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating Auction..." : "Create Auction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateAuction

