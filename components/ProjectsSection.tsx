'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { addProject, editProject, deleteProject } from '@/redux/projectsSlice'
import ProjectForm from './ProjectForm'
import TaskList from './TaskList'

export default function ProjectsSection() {
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
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      {projects.map((project) => (
        <div key={project.id} className="mb-4 p-4 border rounded">
          {editingProjectId === project.id ? (
            <ProjectForm
              project={project}
              onSubmit={handleEditProject}
              onCancel={() => setEditingProjectId(null)}
            />
          ) : (
            <>
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p>Deadline: {project.deadline}</p>
              <p>Progress: {project.progress}%</p>
              <div className="mt-2">
                <button
                  onClick={() => setEditingProjectId(project.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
              <TaskList projectId={project.id} />
            </>
          )}
        </div>
      ))}
      {isAddingProject ? (
        <ProjectForm
          onSubmit={handleAddProject}
          onCancel={() => setIsAddingProject(false)}
        />
      ) : (
        <button
          onClick={() => setIsAddingProject(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Project
        </button>
      )}
    </div>
  )
}

