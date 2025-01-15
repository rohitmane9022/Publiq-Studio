import { TeamMember } from '@/types'

let teamMembers: TeamMember[] = [
  { id: '1', name: 'Rohit Mane', email: 'rohit@example.com', role: 'Developer' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
]

const getInitialTeamMembers = (): TeamMember[] => {
  if (typeof window === 'undefined') {
    return teamMembers
  }

  const storedMembers = window.localStorage.getItem('teamMembers')
  if (storedMembers) {
    teamMembers = JSON.parse(storedMembers)
    return teamMembers
  }


  window.localStorage.setItem('teamMembers', JSON.stringify(teamMembers))
  return teamMembers
}

const persistTeamMembers = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('teamMembers', JSON.stringify(teamMembers))
  }
}


teamMembers = getInitialTeamMembers()

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
      teamMembers = [...teamMembers, newMember]
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