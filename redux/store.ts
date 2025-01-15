import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './projectsSlice'
import tasksReducer from './tasksSlice'
import teamReducer from './teamSlice'

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    team: teamReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

