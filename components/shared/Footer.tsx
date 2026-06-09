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
        
        <p className="text-gray-500">&copy; {new Date().getFullYear()} Vikraya. All rights reserved.<a href="https://v19.tech/?utm_source=vikraya&utm_medium=referral&utm_campaign=built_by_v19" target="_blank" rel="noopener noreferrer" className="ml-1 text-inherit opacity-80 underline-offset-2 hover:underline">· Built by V19</a></p>
      </div>
    </footer>
  )
}

export default Footer