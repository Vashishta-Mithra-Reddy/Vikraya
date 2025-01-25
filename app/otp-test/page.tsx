"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, CheckCircle2, Loader2 } from "lucide-react"

export default function Otptest() {
  const [otp, setOtp] = useState("")
  const [responseMessage, setResponseMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const { user } = useAuth()
  const email = user?.email || ""

  const handleGenerateOtp = async () => {
    try {
      if (!email) {
        setResponseMessage("No authenticated user found.")
        return
      }

      setIsGenerating(true)
      setResponseMessage("")

      const response = await fetch("/api/otp/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        const data = await response.json()
        setResponseMessage(`OTP sent successfully: ${data.message}`)
      } else {
        const errorData = await response.json()
        setResponseMessage(`Error: ${errorData.message}`)
      }
    } catch (err) {
      console.error("Error generating OTP:", err)
      setResponseMessage("An error occurred while generating OTP.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleVerifyOtp = async () => {
    try {
      if (!email) {
        setResponseMessage("No authenticated user found.")
        return
      }

      setIsVerifying(true)
      setResponseMessage("")

      const response = await fetch("/api/otp/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      })

      if (response.ok) {
        const data = await response.json()
        setResponseMessage(`OTP verified successfully: ${data.message}`)
      } else {
        const errorData = await response.json()
        setResponseMessage(`Error: ${errorData.message}`)
      }
    } catch (err) {
      console.error("Error verifying OTP:", err)
      setResponseMessage("An error occurred while verifying OTP.")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader></CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" onClick={handleGenerateOtp} disabled={!email || isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" /> Generate OTP
              </>
            )}
          </Button>
          <div className="flex items-center space-x-2">
            <Input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <Button onClick={handleVerifyOtp} disabled={!email || isVerifying}>
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" /> Verify
                </>
              )}
            </Button>
          </div>
          {responseMessage && (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>{responseMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

