import { Task } from '@/types'

let tasks: Task[] = [
  { id: '1', title: 'Task 1', assignedTo: 'John Doe', deadline: '2023-12-15', status: 'In Progress', projectId: '1' },
  { id: '2', title: 'Task 2', assignedTo: 'Jane Smith', deadline: '2023-12-20', status: 'To Do', projectId: '1' },
]

export const fetchTasksAPI = async (): Promise<{ data: Task[] }> => {
  return { data: tasks }
}

export const addTaskAPI = async (task: Task): Promise<{ data: Task }> => {
  const newTask = { ...task, id: Date.now().toString() }
  tasks = [...tasks, newTask]
  return { data: newTask }
}

export const editTaskAPI = async (task: Task): Promise<{ data: Task }> => {
  const index = tasks.findIndex((t) => t.id === task.id)
  if (index !== -1) {
    tasks = [
      ...tasks.slice(0, index),
      task,
      ...tasks.slice(index + 1)
    ]
    return { data: task }
  }
  throw new Error('Task not found')
}

export const deleteTaskAPI = async (taskId: string): Promise<void> => {
  tasks = tasks.filter((t) => t.id !== taskId)
}