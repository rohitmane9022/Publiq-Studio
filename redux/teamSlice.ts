import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TeamMember } from '@/types'
import { fetchTeamMembersAPI, addTeamMemberAPI, editTeamMemberAPI, deleteTeamMemberAPI } from '@/api/team'

interface TeamState {
  teamMembers: TeamMember[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TeamState = {
  teamMembers: [],
  status: 'idle',
  error: null,
}

export const fetchTeamMembers = createAsyncThunk('team/fetchTeamMembers', async () => {
  const response = await fetchTeamMembersAPI()
  return response.data
})

export const addTeamMember = createAsyncThunk('team/addTeamMember', async (member: TeamMember) => {
  const response = await addTeamMemberAPI(member)
  return response.data
})

export const editTeamMember = createAsyncThunk('team/editTeamMember', async (member: TeamMember) => {
  const response = await editTeamMemberAPI(member)
  return response.data
})

export const deleteTeamMember = createAsyncThunk('team/deleteTeamMember', async (memberId: string) => {
  await deleteTeamMemberAPI(memberId)
  return memberId
})

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action: PayloadAction<TeamMember[]>) => {
        state.status = 'succeeded'
        state.teamMembers = action.payload
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(addTeamMember.fulfilled, (state, action: PayloadAction<TeamMember>) => {
        state.teamMembers.push(action.payload)
      })
      .addCase(editTeamMember.fulfilled, (state, action: PayloadAction<TeamMember>) => {
        const index = state.teamMembers.findIndex((member) => member.id === action.payload.id)
        if (index !== -1) {
          state.teamMembers[index] = action.payload
        }
      })
      .addCase(deleteTeamMember.fulfilled, (state, action: PayloadAction<string>) => {
        state.teamMembers = state.teamMembers.filter((member) => member.id !== action.payload)
      })
  },
})

export default teamSlice.reducer

