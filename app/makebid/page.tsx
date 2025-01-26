"use client"

import MakeBid from "@/components/MakeBid";
import Counter from "@/components/Counter";
import { getAuth } from "firebase/auth";

export default function MakeBidPage() {
    const auth = getAuth()
    const user = auth.currentUser
    const userEmail = user?.email || "";
    console.log(userEmail);

    return <div>
        <MakeBid auctionId={"8"} userEmail={userEmail}/>
        <Counter/>
    </div>;
}