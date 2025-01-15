'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Circle, Clock } from 'lucide-react'

export default function TasksOverview() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks)

  const taskCounts = {
    'To Do': tasks.filter(task => task.status === 'To Do').length,
    'In Progress': tasks.filter(task => task.status === 'In Progress').length,
    'Completed': tasks.filter(task => task.status === 'Completed').length,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <Circle className="h-8 w-8 text-blue-500 mb-2" />
            <span className="text-2xl font-bold">{taskCounts['To Do']}</span>
            <span className="text-sm text-muted-foreground">To Do</span>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="h-8 w-8 text-yellow-500 mb-2" />
            <span className="text-2xl font-bold">{taskCounts['In Progress']}</span>
            <span className="text-sm text-muted-foreground">In Progress</span>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
            <span className="text-2xl font-bold">{taskCounts['Completed']}</span>
            <span className="text-sm text-muted-foreground">Completed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

