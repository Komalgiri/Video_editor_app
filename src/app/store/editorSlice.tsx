// src/store/editorSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface EditorState {
  videoFile: string | null
  audioFile: string | null
  subtitles: string[]
}

const initialState: EditorState = {
  videoFile: null,
  audioFile: null,
  subtitles: [],
}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setVideoFile(state, action: PayloadAction<string>) {
      state.videoFile = action.payload
    },
    setAudioFile(state, action: PayloadAction<string>) {
      state.audioFile = action.payload
    },
    addSubtitle(state, action: PayloadAction<string>) {
      state.subtitles.push(action.payload)
    },
  },
})

export const { setVideoFile, setAudioFile, addSubtitle } = editorSlice.actions
export default editorSlice.reducer
