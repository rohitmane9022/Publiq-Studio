import { TeamMember } from '@/types'

let teamMembers: TeamMember[] = [
  { id: '1', name: 'Rohit Mane', email: 'rohit@example.com', role: 'Developer' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
]

export const fetchTeamMembersAPI = async (): Promise<{ data: TeamMember[] }> => {
  return { data: teamMembers }
}

export const addTeamMemberAPI = async (member: TeamMember): Promise<{ data: TeamMember }> => {
  const newMember = { ...member, id: Date.now().toString() }
  teamMembers = [...teamMembers, newMember]
  return { data: newMember }
}

export const editTeamMemberAPI = async (member: TeamMember): Promise<{ data: TeamMember }> => {
  const index = teamMembers.findIndex((m) => m.id === member.id)
  if (index !== -1) {
    teamMembers = [
      ...teamMembers.slice(0, index),
      member,
      ...teamMembers.slice(index + 1)
    ]
    return { data: member }
  }
  throw new Error('Team member not found')
}

export const deleteTeamMemberAPI = async (memberId: string): Promise<void> => {
  teamMembers = teamMembers.filter((m) => m.id !== memberId)
}