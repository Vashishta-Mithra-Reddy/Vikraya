import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, CheckCircle2, Loader2, X } from "lucide-react";

interface OtpComponentProps {
  email: string;
  onVerified?: () => void; // Callback triggered on successful OTP verification
  onClose?: () => void; // Callback to close the OTP modal
  className?: string;
}

const onGenerateOtp = async (email: string) => {
  try {
    const response = await fetch("/api/otp/generate-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return { ok: response.ok, message: data.message };
  } catch (error) {
    console.error("Error generating OTP:", error);
    return { ok: false, message: "Failed to generate OTP" };
  }
};

const onVerifyOtp = async (email: string, otp: string) => {
  try {
    const response = await fetch("/api/otp/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    return { ok: response.ok, message: data.message };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { ok: false, message: "Failed to verify OTP" };
  }
};

export function OtpComponent({ email, onVerified, onClose, className = "" }: OtpComponentProps) {
  const [otp, setOtp] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleGenerateOtp = async () => {
    try {
      if (!email) {
        setResponseMessage("No email provided.");
        return;
      }

      setIsGenerating(true);
      setResponseMessage("");

      const { ok, message } = await onGenerateOtp(email);

      if (ok) {
        setResponseMessage(`OTP sent successfully: ${message}`);
      } else {
        setResponseMessage(`Error: ${message}`);
      }
    } catch (err) {
      console.error("Error generating OTP:", err);
      setResponseMessage("An error occurred while generating OTP.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!email) {
        setResponseMessage("No email provided.");
        return;
      }

      setIsVerifying(true);
      setResponseMessage("");

      const { ok, message } = await onVerifyOtp(email, otp);

      if (ok) {
        setResponseMessage(`OTP verified successfully: ${message}`);
        if (onVerified) {
          onVerified(); // Trigger the callback
        }
      } else {
        setResponseMessage(`Error: ${message}`);
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setResponseMessage("An error occurred while verifying OTP.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Card className="w-[350px] relative">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}

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
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
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
  );
}