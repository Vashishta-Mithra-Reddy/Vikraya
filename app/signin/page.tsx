"use client";

import { useState, useEffect } from "react";
import { auth } from "@/utils/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getIdToken } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [availableHeight, setAvailableHeight] = useState("100dvh");
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

    adjustHeight();
    window.addEventListener("resize", adjustHeight);

    return () => {
      window.removeEventListener("resize", adjustHeight);
    };
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await getIdToken(userCredential.user); // Get the Firebase ID token
      await setToken(token); // Set the token via API
      toast.success("Signed in successfully!");
      router.push(redirectPath);
    } catch (err: any) {
      const message = formatErrorMessage(err.message);
      toast.error(message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const token = await getIdToken(userCredential.user); // Get the Firebase ID token
      await setToken(token); // Set the token via API
      toast.success("Signed in with Google!");
      router.push(redirectPath);
    } catch (err: any) {
      const message = formatErrorMessage(err.message);
      toast.error(message);
    }
  };

  const setToken = async (token: string) => {
    try {
      const response = await fetch("/api/auth/setToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        throw new Error("Failed to set authentication token.");
      }
    } catch (error) {
      toast.error("An error occurred while setting the authentication token.");
    }
  };

  const formatErrorMessage = (errorMessage: string): string => {
    if (errorMessage.includes("auth/user-not-found")) {
      return "No user found with this email.";
    } else if (errorMessage.includes("auth/invalid-credential")) {
      return "Incorrect Credentials. Please try again.";
    } else if (errorMessage.includes("auth/email-already-in-use")) {
      return "This email is already in use.";
    } else if (errorMessage.includes("auth/popup-closed-by-user")) {
      return "Google sign-in was canceled.";
    } else if (errorMessage.includes("auth/network-request-failed")) {
      return "Network error. Please check your internet connection.";
    } else if (errorMessage.includes("auth/too-many-requests")) {
      return "Too Many Requests!";
    }
    return errorMessage.slice(15);
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-100 transition-all"
      style={{ height: availableHeight }}
    >
      

      {/* Sign-In Form */}
      <form
        className="p-8 bg-white b-1 rounded-lg w-full max-w-md py-12"
        onSubmit={handleSignIn}
      >
      {/* <div className="flex items-center justify-center ">
        <Image
          src={"/logos/vikraya.png"}
          alt="Vikraya Logo"
          width={100}
          height={100}
          className="rounded"
        />
      </div> */}
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Sign In</h2>

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

        {/* Sign-In Button */}
        <button
          type="submit"
          className="border-2 text-black py-2 px-5 rounded-lg w-full mb-4 hover:bg-gray-200"
        >
          Sign In
        </button>

        {/* Google Sign-In Button */}
        <button
          type="button"
          className="border-2 text-black py-2 px-5 rounded-lg w-full hover:bg-gray-200"
          onClick={handleGoogleSignIn}
        >
          Sign In with Google
        </button>
      </form>
    </div>
  );
}
