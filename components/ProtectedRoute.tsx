"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Get the current path and include it as a redirect query parameter
        const currentPath = window.location.pathname; 
        router.push(`/signin?redirect=${encodeURIComponent(currentPath)}`); // Redirect to Sign In with redirect path
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, [router]);

  return <>{children}</>;
}
