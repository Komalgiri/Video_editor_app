'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AudioSegment {
  id: number
  label: string
  isMuted: boolean
}

export const AudioEditor = () => {
  const [segments, setSegments] = useState<AudioSegment[]>([
    { id: 1, label: "Intro", isMuted: false },
    { id: 2, label: "Voice Over", isMuted: false },
    { id: 3, label: "Music", isMuted: false },
  ])

  const toggleMute = (id: number) => {
    setSegments((prev) =>
      prev.map((seg) =>
        seg.id === id ? { ...seg, isMuted: !seg.isMuted } : seg
      )
    )
  }

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">🎵 Audio Editor</h2>
      <div className="w-full h-16 bg-gradient-to-r from-gray-300 to-gray-200 rounded-md flex items-center justify-center text-sm text-gray-700 font-mono">
        [ static waveform mock ]
      </div>

      <div className="space-y-2">
        {segments.map((segment) => (
          <div
            key={segment.id}
            className="flex justify-between items-center border p-3 rounded-md"
          >
            <span>{segment.label}</span>
            <Button
              variant={segment.isMuted ? "secondary" : "default"}
              onClick={() => toggleMute(segment.id)}
            >
              {segment.isMuted ? "Unmute" : "Mute"}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
