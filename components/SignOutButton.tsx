// SignOutButton.tsx
"use client";

import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);

      // Make an API call to delete the httpOnly cookie server-side
      const res = await fetch("/api/auth/signout", {
        method: "DELETE",
        credentials: "include", // Important for cookie handling
      });

      if (!res.ok) {
        throw new Error("Failed to sign out.");
      }

      // Redirect to home or sign-in page after sign-out
      toast.success("Signed out Successfully.")
      router.push("/");
    } catch (err: any) {
      console.error("Sign out error:", err.message);
    }
  };

  return (
    <button
      className="border-2 text-black py-2 px-5 rounded-lg hover:bg-gray-200"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
}