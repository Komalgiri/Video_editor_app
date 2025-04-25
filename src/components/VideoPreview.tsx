'use client'

import { useEffect, useState } from "react"
import { useDrag, useDrop } from "react-dnd"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { addScene, removeScene, moveScene } from "@/store/editorSlice"

interface Scene {
  id: string
  label: string
}

export const VideoTimeline = () => {
  const dispatch = useDispatch()
  const scenes = useSelector((state: RootState) => state.editor.scenes)

  const [draggedScene, setDraggedScene] = useState<Scene | null>(null)

  useEffect(() => {
    if (scenes.length === 0) {
      dispatch(addScene()) // Add a default scene if no scenes
    }
  }, [scenes, dispatch])

  const handleAddScene = () => {
    dispatch(addScene())
  }

  const handleRemoveScene = (id: string) => {
    dispatch(removeScene(id))
  }

  const handleMoveScene = (fromIndex: number, toIndex: number) => {
    dispatch(moveScene({ fromIndex, toIndex }))
  }

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">🎬 Video Timeline</h2>

      <div className="relative w-full h-16 bg-gray-200 rounded-md">
        <div className="absolute w-full h-full flex items-center space-x-2 px-2">
          {scenes.map((scene, index) => (
            <TimelineScene
              key={scene.id}
              index={index}
              scene={scene}
              handleRemove={handleRemoveScene}
              handleMove={handleMoveScene}
              setDraggedScene={setDraggedScene}
              draggedScene={draggedScene}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleAddScene}>Add Scene</Button>
    </Card>
  )
}

interface TimelineSceneProps {
  scene: Scene
  index: number
  handleRemove: (id: string) => void
  handleMove: (fromIndex: number, toIndex: number) => void
  setDraggedScene: (scene: Scene | null) => void
  draggedScene: Scene | null
}

const TimelineScene: React.FC<TimelineSceneProps> = ({
  scene,
  index,
  handleRemove,
  handleMove,
  setDraggedScene,
  draggedScene,
}) => {
  const [, drag] = useDrag({
    type: "SCENE",
    item: { id: scene.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        setDraggedScene(null)
      }
    },
  })

  const [, drop] = useDrop({
    accept: "SCENE",
    hover: (item: any) => {
      if (item.index !== index) {
        handleMove(item.index, index)
      }
    },
  })

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`w-20 h-full bg-blue-500 text-white flex items-center justify-center rounded-md cursor-pointer ${
        draggedScene?.id === scene.id ? "opacity-50" : ""
      }`}
    >
      {scene.label}
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-0 right-0"
        onClick={() => handleRemove(scene.id)}
      >
        🗑️
      </Button>
    </div>
  )
}
