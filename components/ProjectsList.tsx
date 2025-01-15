'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { addProject, editProject, deleteProject } from '@/redux/projectsSlice'
import ProjectForm from './ProjectForm'
import TaskList from './TaskList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Pencil, Trash2, Plus } from 'lucide-react'

export default function ProjectsList() {
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null)
  const projects = useSelector((state: RootState) => state.projects.projects)
  const dispatch = useDispatch()

  const handleAddProject = (project: Project) => {
    dispatch(addProject(project))
    setIsAddingProject(false)
  }

  const handleEditProject = (project: Project) => {
    dispatch(editProject(project))
    setEditingProjectId(null)
  }

  const handleDeleteProject = (projectId: string) => {
    dispatch(deleteProject(projectId))
  }

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <Accordion type="single" collapsible key={project.id}>
          <AccordionItem value={project.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <AccordionTrigger>{project.name}</AccordionTrigger>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => setEditingProjectId(project.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingProjectId === project.id ? (
                  <ProjectForm
                    project={project}
                    onSubmit={handleEditProject}
                    onCancel={() => setEditingProjectId(null)}
                  />
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-2">Deadline: {project.deadline}</p>
                    <div className="flex items-center space-x-2 mb-4">
                      <Progress value={project.progress} className="flex-grow" />
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                    <AccordionContent>
                      <TaskList projectId={project.id} />
                    </AccordionContent>
                  </>
                )}
              </CardContent>
            </Card>
          </AccordionItem>
        </Accordion>
      ))}
      {isAddingProject ? (
        <Card>
          <CardContent className="pt-6">
            <ProjectForm
              onSubmit={handleAddProject}
              onCancel={() => setIsAddingProject(false)}
            />
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setIsAddingProject(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      )}
    </div>
  )
}

