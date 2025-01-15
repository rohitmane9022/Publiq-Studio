'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { addTask, editTask, deleteTask } from '@/redux/tasksSlice'
import TaskForm from './TaskForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2, Plus } from 'lucide-react'

interface TaskListProps {
  projectId: string
}

export default function TaskList({ projectId }: TaskListProps) {
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const tasks = useSelector((state: RootState) => 
    state.tasks.tasks.filter(task => task.projectId === projectId)
  )
  const dispatch = useDispatch()

  const handleAddTask = (task: Task) => {
    dispatch(addTask({ ...task, projectId }))
    setIsAddingTask(false)
  }

  const handleEditTask = (task: Task) => {
    dispatch(editTask(task))
    setEditingTaskId(null)
  }

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'To Do':
        return 'bg-blue-500'
      case 'In Progress':
        return 'bg-yellow-500'
      case 'Completed':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent className="p-4">
            {editingTaskId === task.id ? (
              <TaskForm
                task={task}
                onSubmit={handleEditTask}
                onCancel={() => setEditingTaskId(null)}
              />
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium">{task.title}</h4>
                  <p className="text-sm text-muted-foreground">Assigned to: {task.assignedTo}</p>
                  <p className="text-sm text-muted-foreground">Deadline: {task.deadline}</p>
                  <Badge className={`mt-2 ${getStatusColor(task.status)}`}>{task.status}</Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => setEditingTaskId(task.id)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      {isAddingTask ? (
        <Card>
          <CardContent className="p-4">
            <TaskForm
              onSubmit={handleAddTask}
              onCancel={() => setIsAddingTask(false)}
            />
          </CardContent>
        </Card>
      ) : (
        <Button variant="outline" onClick={() => setIsAddingTask(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      )}
    </div>
  )
}

