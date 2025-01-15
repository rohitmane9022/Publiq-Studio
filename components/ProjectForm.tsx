import { useState } from 'react'
import { Project } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ProjectFormProps {
  project?: Project
  onSubmit: (project: Project) => void
  onCancel: () => void
}

export default function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [name, setName] = useState(project?.name || '')
  const [deadline, setDeadline] = useState(project?.deadline || '')
  const [progress, setProgress] = useState(project?.progress || 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      id: project?.id || Date.now().toString(),
      name,
      deadline,
      progress,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Project Name</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="deadline">Deadline</Label>
        <Input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="progress">Progress (%)</Label>
        <Input
          type="number"
          id="progress"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          min="0"
          max="100"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {project ? 'Update' : 'Add'} Project
        </Button>
      </div>
    </form>
  )
}

