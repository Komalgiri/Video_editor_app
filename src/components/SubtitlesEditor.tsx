'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Subtitle {
  id: string
  text: string
  startTime: number
  endTime: number
  fontSize: string
  fontColor: string
}

export const SubtitleEditor = () => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([])
  const [newSubtitle, setNewSubtitle] = useState<Subtitle>({
    id: Date.now().toString(),
    text: "",
    startTime: 0,
    endTime: 0,
    fontSize: "16px",
    fontColor: "#FFFFFF",
  })

  const handleAddSubtitle = () => {
    setSubtitles([...subtitles, newSubtitle])
    setNewSubtitle({
      id: Date.now().toString(),
      text: "",
      startTime: 0,
      endTime: 0,
      fontSize: "16px",
      fontColor: "#FFFFFF",
    })
  }

  const handleRemoveSubtitle = (id: string) => {
    setSubtitles(subtitles.filter((subtitle) => subtitle.id !== id))
  }

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">📝 Subtitle Editor</h2>

      <div className="space-y-4">
        <Label>Subtitle Text</Label>
        <Textarea
          value={newSubtitle.text}
          onChange={(e) =>
            setNewSubtitle({ ...newSubtitle, text: e.target.value })
          }
          placeholder="Enter subtitle text"
        />

        <Label>Start Time (s)</Label>
        <Input
          type="number"
          value={newSubtitle.startTime}
          onChange={(e) =>
            setNewSubtitle({ ...newSubtitle, startTime: parseInt(e.target.value) })
          }
        />

        <Label>End Time (s)</Label>
        <Input
          type="number"
          value={newSubtitle.endTime}
          onChange={(e) =>
            setNewSubtitle({ ...newSubtitle, endTime: parseInt(e.target.value) })
          }
        />

        <Label>Font Size</Label>
        <Input
          type="text"
          value={newSubtitle.fontSize}
          onChange={(e) =>
            setNewSubtitle({ ...newSubtitle, fontSize: e.target.value })
          }
        />

        <Label>Font Color</Label>
        <Input
          type="color"
          value={newSubtitle.fontColor}
          onChange={(e) =>
            setNewSubtitle({ ...newSubtitle, fontColor: e.target.value })
          }
        />

        <Button onClick={handleAddSubtitle}>Add Subtitle</Button>
      </div>

      <div className="space-y-2">
        {subtitles.map((subtitle) => (
          <div
            key={subtitle.id}
            className="flex justify-between items-center border p-3 rounded-md"
          >
            <span>
              <strong>Text:</strong> {subtitle.text} <br />
              <strong>Timing:</strong> {subtitle.startTime}s - {subtitle.endTime}s
            </span>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => handleRemoveSubtitle(subtitle.id)}
            >
              🗑️
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
