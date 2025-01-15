import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '@/types'
import { fetchTasksAPI, addTaskAPI, editTaskAPI, deleteTaskAPI } from '@/api/tasks'

interface TasksState {
  tasks: Task[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
  error: null,
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetchTasksAPI()
  return response.data
})

export const addTask = createAsyncThunk('tasks/addTask', async (task: Task) => {
  const response = await addTaskAPI(task)
  return response.data
})

export const editTask = createAsyncThunk('tasks/editTask', async (task: Task) => {
  const response = await editTaskAPI(task)
  return response.data
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
  await deleteTaskAPI(taskId)
  return taskId
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded'
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload)
      })
      .addCase(editTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      })
  },
})

export default tasksSlice.reducer

