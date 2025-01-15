import { Project } from '@/types'

let projects: Project[] = [
  { id: '1', name: 'Project A', deadline: '2023-12-31', progress: 25 },
  { id: '2', name: 'Project B', deadline: '2023-11-30', progress: 50 },
]

export const fetchProjectsAPI = async (): Promise<{ data: Project[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: projects })
    }, 500)
  })
}

export const addProjectAPI = async (project: Project): Promise<{ data: Project }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProject = { ...project, id: Date.now().toString() }
      projects.push(newProject)
      resolve({ data: newProject })
    }, 500)
  })
}

export const editProjectAPI = async (project: Project): Promise<{ data: Project }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = projects.findIndex((p) => p.id === project.id)
      if (index !== -1) {
        projects[index] = project
        resolve({ data: project })
      } else {
        throw new Error('Project not found')
      }
    }, 500)
  })
}

export const deleteProjectAPI = async (projectId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      projects = projects.filter((p) => p.id !== projectId)
      resolve()
    }, 500)
  })
}

