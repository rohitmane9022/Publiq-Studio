
'use client'

import ProjectsList from '@/components/ProjectsList'
import { fetchProjects } from '@/redux/projectsSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function ProjectsPage() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchProjects())
  },[dispatch])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Projects</h1>
      <ProjectsList />
    </div>
  )
}

