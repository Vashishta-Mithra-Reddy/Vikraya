"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface MakeBidProps {
  auctionId: string
}

const MakeBid: React.FC<MakeBidProps> = ({ auctionId }) => {
  const [bidAmount, setBidAmount] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  // Smart contract details
  const contractAddress = "0xe91596b3faff58a4249be3cd0967edc9505ad906"
  const abi = [
    {
      inputs: [
        { internalType: "uint256", name: "_id", type: "uint256" }
      ],
      name: "placeBid",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    }
  ]

  const handlePlaceBid = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!window.ethereum) throw new Error("Metamask is not installed")
      
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)

      // Convert bid amount to wei
      const bidAmountWei = ethers.parseEther(bidAmount)

      // Place bid transaction
      const tx = await contract.placeBid(auctionId, { value: bidAmountWei })
      await tx.wait()

      alert("Bid placed successfully!")
      setBidAmount("")
    } catch (err: any) {
      console.error(err)
      alert(`Error placing bid: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-6">
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
              placeholder="Enter bid amount in ETH"
              min="0"
              step="0.001"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !bidAmount}
          >
            {loading ? "Placing Bid..." : "Place Bid"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default MakeBid