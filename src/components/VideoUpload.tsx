'use client'

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"

export const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setVideoFile(file)
      setPreview(URL.createObjectURL(file))

      // Simulate progress
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval)
            return 100
          }
          return p + 10
        })
      }, 150)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
      "video/webm": [".webm"],
      "video/ogg": [".ogg"],
    },
    maxFiles: 1,
  })

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">📤 Upload Your Video</h2>

      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg cursor-pointer text-center transition-all ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the video here...</p>
        ) : (
          <p>Drag & drop a video file here, or click to select</p>
        )}
      </div>

      {progress > 0 && progress < 100 && (
        <Progress value={progress} className="w-full" />
      )}

      {preview && (
        <video
          className="w-full rounded shadow-md"
          src={preview}
          controls
        />
      )}
    </Card>
  )
}
