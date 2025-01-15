import { Task } from '@/types'


const getInitialTasks = (): Task[] => {
  const storedTasks = localStorage.getItem('tasks')
  return storedTasks ? JSON.parse(storedTasks) : [
    { id: '1', title: 'Task 1', assignedTo: 'John Doe', deadline: '2023-12-15', status: 'In Progress', projectId: '1' },
    { id: '2', title: 'Task 2', assignedTo: 'Jane Smith', deadline: '2023-12-20', status: 'To Do', projectId: '1' },
  ]
}

let tasks: Task[] = getInitialTasks()


const persistTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

export const fetchTasksAPI = async (): Promise<{ data: Task[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: tasks })
    }, 500)
  })
}

export const addTaskAPI = async (task: Task): Promise<{ data: Task }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask = { ...task, id: Date.now().toString() }
      tasks = [...tasks, newTask]  
      persistTasks()
      resolve({ data: newTask })
    }, 500)
  })
}

export const editTaskAPI = async (task: Task): Promise<{ data: Task }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = tasks.findIndex((t) => t.id === task.id)
      if (index !== -1) {
       
        tasks = [
          ...tasks.slice(0, index),
          task,
          ...tasks.slice(index + 1)
        ]
        persistTasks()
        resolve({ data: task })
      } else {
        reject(new Error('Task not found'))
      }
    }, 500)
  })
}

export const deleteTaskAPI = async (taskId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks = tasks.filter((t) => t.id !== taskId)
      persistTasks()
      resolve()
    }, 500)
  })
}