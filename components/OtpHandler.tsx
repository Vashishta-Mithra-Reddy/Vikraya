
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, CheckCircle2, Loader2 } from "lucide-react"

interface OtpComponentProps {
  email: string
  onGenerateOtp: (email: string) => Promise<{ ok: boolean; message: string }>
  onVerifyOtp: (email: string, otp: string) => Promise<{ ok: boolean; message: string }>
  className?: string
}

export function OtpComponent({ email, onGenerateOtp, onVerifyOtp, className = "" }: OtpComponentProps) {
  const [otp, setOtp] = useState("")
  const [responseMessage, setResponseMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleGenerateOtp = async () => {
    try {
      if (!email) {
        setResponseMessage("No email provided.")
        return
      }

      setIsGenerating(true)
      setResponseMessage("")

      const { ok, message } = await onGenerateOtp(email)

      if (ok) {
        setResponseMessage(`OTP sent successfully: ${message}`)
      } else {
        setResponseMessage(`Error: ${message}`)
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
        setResponseMessage("No email provided.")
        return
      }

      setIsVerifying(true)
      setResponseMessage("")

      const { ok, message } = await onVerifyOtp(email, otp)

      if (ok) {
        setResponseMessage(`OTP verified successfully: ${message}`)
      } else {
        setResponseMessage(`Error: ${message}`)
      }
    } catch (err) {
      console.error("Error verifying OTP:", err)
      setResponseMessage("An error occurred while verifying OTP.")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>OTP Verification</CardTitle>
          <CardDescription>Generate and verify OTP for {email || "No email provided"}</CardDescription>
        </CardHeader>
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

