export interface Project {
  id: string
  name: string
  deadline: string
  progress: number
}

export interface Task {
  id: string
  title: string
  assignedTo: string
  deadline: string
  status: 'To Do' | 'In Progress' | 'Completed'
  projectId: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
}

