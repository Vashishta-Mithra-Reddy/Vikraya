import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white backdrop-blur-sm ">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-black mx-auto" />
      </div>
    </div>
  )
}