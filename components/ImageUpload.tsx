import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { X } from "lucide-react"

interface ImageUploadProps {
  images: string[]
  setImages: (images: string[]) => void
}

export function ImageUpload({ images, setImages }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // In a real application, you would upload the file to your server or a cloud storage service
        // For this example, we'll use a data URL
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(file)
        })
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      setImages([...images, ...uploadedUrls])
    } catch (error) {
      console.error("Error uploading images:", error)
      alert("Failed to upload images. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image || "/placeholder.svg"}
              alt={`Uploaded image ${index + 1}`}
              width={100}
              height={100}
              className="rounded-md"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6"
              onClick={() => removeImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <Input className="hover:cursor-pointer" type="file" accept="image/*" multiple onChange={handleUpload} disabled={uploading} />
        {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
      </div>
    </div>
  )
}

