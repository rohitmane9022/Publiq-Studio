'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

export default function ProjectsOverview() {
  const projects = useSelector((state: RootState) => state.projects.projects)


  return (
    <Link href="/projects">
    <Card>
      <CardHeader>
        <CardTitle>Projects Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects?.map((project) => (
            <div key={project.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{project.name}</span>
                <span className="text-sm text-muted-foreground">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}

