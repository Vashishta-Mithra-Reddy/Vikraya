"use client"

import { useAuth } from "@/context/AuthContext"
import SignOutButton from "@/components/SignOutButton"
import { OtpComponent } from "@/components/OtpHandler"

export default function ProfilePage() {
  const { user } = useAuth()

  const handleGenerateOtp = async (email: string) => {
    try {
      const response = await fetch("/api/otp/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      return { ok: response.ok, message: data.message }
    } catch (error) {
      console.error("Error generating OTP:", error)
      return { ok: false, message: "Failed to generate OTP" }
    }
  }

  const handleVerifyOtp = async (email: string, otp: string) => {
    try {
      const response = await fetch("/api/otp/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })
      const data = await response.json()
      return { ok: response.ok, message: data.message }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      return { ok: false, message: "Failed to verify OTP" }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      {/* <h1 className="text-3xl font-bold mb-6">Welcome to your Profile</h1> */}
      <p className="mb-6">Logged in as: {user?.email || "Unknown User"}</p>
      <div className="mb-6">
        <SignOutButton />
      </div>
      <div className="w-full max-w-md">
        <OtpComponent email={user?.email || ""} onGenerateOtp={handleGenerateOtp} onVerifyOtp={handleVerifyOtp} />
      </div>
    </div>
  )
}

