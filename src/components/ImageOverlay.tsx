'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useDropzone } from "react-dropzone"
import { ResizableBox } from "react-resizable"
import "react-resizable/css/styles.css"

export const ImageOverlay = () => {
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(1)

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImage(file)
    const url = URL.createObjectURL(file)
    setImageUrl(url)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  })

  const handleDrag = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    setImagePosition({
      x: clientX - 100, // Adjust the offset based on where you want to start the drag
      y: clientY - 100,
    })
  }

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">🖼️ Image Overlay</h2>

      {!imageUrl ? (
        <div
          {...getRootProps()}
          className="border-2 border-dashed p-6 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <p>Drag & drop an image or click to select an image</p>
        </div>
      ) : (
        <div className="relative">
          <ResizableBox
            width={200}
            height={200}
            minConstraints={[100, 100]}
            maxConstraints={[500, 500]}
            resizeHandles={['se']}
            className="absolute"
          >
            <img
              src={imageUrl}
              alt="Overlay"
              className="absolute"
              style={{
                top: imagePosition.y,
                left: imagePosition.x,
                opacity: opacity,
                cursor: "move",
              }}
              onMouseDown={(e) => e.preventDefault()} // Prevents text selection on drag
              onMouseMove={handleDrag}
            />
          </ResizableBox>
        </div>
      )}

      <div className="space-y-4">
        <Button
          variant="outline"
          onClick={() => setImageUrl(null)}
          className="w-full"
        >
          Remove Image
        </Button>

        <label className="block">Opacity</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </Card>
  )
}
