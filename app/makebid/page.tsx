import MakeBid from "@/components/MakeBid";
import Counter from "@/components/Counter";

export default function MakeBidPage() {
    return <div>
        <MakeBid auctionId={"5"} />
        <Counter/>
    </div>;
}