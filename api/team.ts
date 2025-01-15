import { TeamMember } from '@/types'


const getInitialTeamMembers = (): TeamMember[] => {
  const storedMembers = localStorage.getItem('teamMembers')
  return storedMembers ? JSON.parse(storedMembers) : [
    { id: '1', name: 'Rohit Mane', email: 'rohit@example.com', role: 'Developer' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
  ]
}

let teamMembers: TeamMember[] = getInitialTeamMembers()


const persistTeamMembers = () => {
  localStorage.setItem('teamMembers', JSON.stringify(teamMembers))
}

export const fetchTeamMembersAPI = async (): Promise<{ data: TeamMember[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: teamMembers })
    }, 500)
  })
}

export const addTeamMemberAPI = async (member: TeamMember): Promise<{ data: TeamMember }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMember = { ...member, id: Date.now().toString() }
      teamMembers = [...teamMembers, newMember]  // Create new array instead of using push
      persistTeamMembers()
      resolve({ data: newMember })
    }, 500)
  })
}

export const editTeamMemberAPI = async (member: TeamMember): Promise<{ data: TeamMember }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = teamMembers.findIndex((m) => m.id === member.id)
      if (index !== -1) {
       
        teamMembers = [
          ...teamMembers.slice(0, index),
          member,
          ...teamMembers.slice(index + 1)
        ]
        persistTeamMembers()
        resolve({ data: member })
      } else {
        reject(new Error('Team member not found'))
      }
    }, 500)
  })
}

export const deleteTeamMemberAPI = async (memberId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      teamMembers = teamMembers.filter((m) => m.id !== memberId)
      persistTeamMembers()
      resolve()
    }, 500)
  })
}