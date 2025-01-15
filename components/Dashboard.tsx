'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ProjectsOverview from './ProjectsOverview'
import TasksOverview from './TasksOverview'
import TeamOverview from './TeamOverview'
import { fetchProjects } from '@/redux/projectsSlice'
import { fetchTeamMembers } from '@/redux/teamSlice'
import { fetchTasks } from '@/redux/tasksSlice'

export default function Dashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProjects())
    dispatch(fetchTeamMembers())
    dispatch(fetchTasks())
  }, [dispatch])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectsOverview />
      <TasksOverview />
      <TeamOverview />
    </div>
  )
}

