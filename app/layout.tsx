import type { Metadata } from "next";
import { Geist, Geist_Mono,Poppins } from "next/font/google";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const poppins = Poppins({
  weight: ["500", "600", "700"],  
  subsets: ["latin"],  
  variable: "--font-poppins", 
});

export const metadata: Metadata = {
  title: "Vikraya",
  description: "A Blockchain based crop auction system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Header/>
        {children}
        <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
