'use client'

import { useState } from "react"
import ReactPlayer from "react-player"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

export const PreviewRenderControls = () => {
  const [isRendering, setIsRendering] = useState(false)
  const [videoUrl, setVideoUrl] = useState("/path/to/your/video.mp4") // Path to your uploaded video
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const handleRender = () => {
    setIsRendering(true)
    setTimeout(() => {
      setIsRendering(false)
      alert("Render Complete! Your video is ready to download.")
    }, 3000) // Simulate render time
  }

  const handleVideoReady = () => {
    setIsVideoLoaded(true)
  }

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">🎬 Preview & Render</h2>

      <div className="relative">
        <ReactPlayer
          url={videoUrl}
          playing={true}
          controls={true}
          width="100%"
          height="auto"
          onReady={handleVideoReady}
          className="shadow-lg rounded-md"
        />
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <Spinner />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Button
          onClick={handleRender}
          disabled={isRendering}
          className="w-full"
        >
          {isRendering ? (
            <Spinner size="sm" className="mr-2" />
          ) : (
            "Render Video"
          )}
        </Button>

        <Button
          variant="outline"
          onClick={() => alert("Downloading Video...")}
          disabled={isRendering}
          className="w-full"
        >
          {isRendering ? "Rendering..." : "Download Video"}
        </Button>
      </div>
    </Card>
  )
}
