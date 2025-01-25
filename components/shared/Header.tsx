"use client";

import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import SignOutButton from "../SignOutButton";
import { useAuth } from "@/context/AuthContext";
import SignInButton from "../SignInButton";

const Header = () => {
  const { user } = useAuth(); // Destructure the user from the useAuth hook

  return (
    <header id="header" className="w-full">
      <div className="flex items-center justify-between p-2 px-12 bg-white border-b">
        {/* Logo */}
        <div>
          <Link href={"/"}>
            <Image
              src={"/logos/vikraya.png"}
              width={70}
              height={70}
              alt="Vikraya Logo"
              unoptimized={true}
            />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex transition-all">
          <NavItems />
        </nav>

        {/* Conditional Button: Sign In or Sign Out */}
        <div className="transition-all">
          {user ? (
            <SignOutButton />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
