'use client'

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { addScene, moveScene, removeScene } from "@/store/editorSlice"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

type SceneItemProps = {
  id: string
  label: string
  index: number
  moveSceneItem: (from: number, to: number) => void
  onRemove: () => void
}

const SceneItem = ({ id, label, index, moveSceneItem, onRemove }: SceneItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "scene",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const [, drop] = useDrop(() => ({
    accept: "scene",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveSceneItem(item.index, index)
        item.index = index
      }
    },
  }))

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-4 bg-white border rounded shadow-sm cursor-move transition-all ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <span>{label}</span>
        <button onClick={onRemove} className="text-red-500 text-sm">✕</button>
      </div>
    </div>
  )
}

export const TimelineEditor = () => {
  const dispatch = useDispatch()
  const scenes = useSelector((state: RootState) => state.editor.scenes)

  const moveSceneItem = (from: number, to: number) => {
    dispatch(moveScene({ fromIndex: from, toIndex: to }))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">🎞️ Video Timeline</h2>
          <button
            onClick={() => dispatch(addScene())}
            className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
          >
            + Add Scene
          </button>
        </div>

        <div className="flex space-x-4 overflow-x-auto p-2 border rounded">
          {scenes.map((scene, idx) => (
            <SceneItem
              key={scene.id}
              id={scene.id}
              label={scene.label}
              index={idx}
              moveSceneItem={moveSceneItem}
              onRemove={() => dispatch(removeScene(scene.id))}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  )
}
