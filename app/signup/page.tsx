"use client";

import { useState, useEffect } from "react";
import { auth } from "@/utils/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [availableHeight, setAvailableHeight] = useState("100dvh"); // Default to 100dvh
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/";

  useEffect(() => {
    const adjustHeight = () => {
      const header = document.getElementById("header");
      const footer = document.getElementById("footer");
      const headerHeight = header?.offsetHeight || 0;
      const footerHeight = footer?.offsetHeight || 0;
      const height = window.innerHeight - headerHeight - footerHeight;
      setAvailableHeight(`${height}px`);
    };

    adjustHeight(); // Set the height initially
    window.addEventListener("resize", adjustHeight); // Adjust height on resize

    return () => {
      window.removeEventListener("resize", adjustHeight); // Cleanup
    };
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signed up successfully!");
      router.push(redirectPath);
    } catch (err: any) {
      const message = formatErrorMessage(err.message);
      toast.error(message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Signed up with Google!");
      router.push(redirectPath);
    } catch (err: any) {
      const message = formatErrorMessage(err.message);
      toast.error(message);
    }
  };

  const formatErrorMessage = (errorMessage: string): string => {
    if (errorMessage.includes("auth/email-already-in-use")) {
      return "This email is already in use.";
    } else if (errorMessage.includes("auth/invalid-credential")) {
      return "Incorrect credentials. Please try again.";
    } else if (errorMessage.includes("auth/network-request-failed")) {
      return "Network error. Please check your internet connection.";
    } else if (errorMessage.includes("auth/too-many-requests")) {
      return "Too many requests! Please try again later.";
    }
    return errorMessage.slice(15); 
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-100 transition-all"
      style={{ height: availableHeight }}
    >
      {/* Sign-Up Form */}
      <form
        className="p-8 bg-white b-1 rounded-lg w-full max-w-md py-12"
        onSubmit={handleSignUp}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Sign Up</h2>
  
        {/* Email Input */}
        <input
          type="email"
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
  
        {/* Password Input */}
        <input
          type="password"
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
  
        {/* Confirm Password Input */}
        <input
          type="password"
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
  
        {/* Sign-Up Button */}
        <button
          type="submit"
          className="border-2 text-black py-2 px-5 rounded-lg w-full mb-4 hover:bg-gray-200"
        >
          Sign Up
        </button>
  
        {/* Google Sign-Up Button */}
        <button
          type="button"
          className="border-2 text-black py-2 px-5 rounded-lg w-full hover:bg-gray-200"
          onClick={handleGoogleSignUp}
        >
          Sign Up with Google
        </button>
      </form>
    </div>
  );
  
}
