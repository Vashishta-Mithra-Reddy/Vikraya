import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer id="footer" className="border-t bg-white">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-2 text-center sm:flex-row">
        <Link href='/'>
        <Image
            src={"/logos/vikraya.png"} width={60} height={60}
            alt="Vikraya Logo"
            unoptimized={true}
            />
        </Link>
        
        <p className="opacity-60 text-black">&copy; {new Date().getFullYear()} Vikraya. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer