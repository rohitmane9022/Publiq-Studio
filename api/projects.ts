import { Project } from '@/types'

let projects: Project[] = [
  { id: '1', name: 'Project A', deadline: '2023-12-31', progress: 25 },
  { id: '2', name: 'Project B', deadline: '2023-11-30', progress: 50 },
]

export const fetchProjectsAPI = async (): Promise<{ data: Project[] }> => {
  return { data: projects }
}

export const addProjectAPI = async (project: Project): Promise<{ data: Project }> => {
  const newProject = { ...project, id: Date.now().toString() }
  projects = [...projects, newProject]
  return { data: newProject }
}

export const editProjectAPI = async (project: Project): Promise<{ data: Project }> => {
  const index = projects.find((p) => p.id === project.id)
  if (index !== -1) {
    projects = [
      ...projects.slice(0, index),
      project,
      ...projects.slice(index + 1)
    ]
    return { data: project }
  }
  throw new Error('Project not found')
}

export const deleteProjectAPI = async (projectId: string): Promise<void> => {
  projects = projects.filter((p) => p.id !== projectId)
}