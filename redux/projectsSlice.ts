import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Project } from '@/types'
import { fetchProjectsAPI, addProjectAPI, editProjectAPI, deleteProjectAPI } from '@/api/projects'

interface ProjectsState {
  projects: Project[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProjectsState = {
  projects: [],
  status: 'idle',
  error: null,
}

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await fetchProjectsAPI()
  return response.data
})

export const addProject = createAsyncThunk('projects/addProject', async (project: Project) => {
  const response = await addProjectAPI(project)
  return response.data
})

export const editProject = createAsyncThunk('projects/editProject', async (project: Project) => {
  const response = await editProjectAPI(project)
  return response.data
})

export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId: string) => {
  await deleteProjectAPI(projectId)
  return projectId
})

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.status = 'succeeded'
        state.projects = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(addProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.projects.push(action.payload)
      })
      .addCase(editProject.fulfilled, (state, action: PayloadAction<Project>) => {
        const index = state.projects.find((project) => project.id === action.payload.id)
        if (index !== -1) {
          state.projects[index] = action.payload
        }
      })
      .addCase(deleteProject.fulfilled, (state, action: PayloadAction<string>) => {
        state.projects = state.projects.filter((project) => project.id !== action.payload)
      })
  },
})

export default projectsSlice.reducer

