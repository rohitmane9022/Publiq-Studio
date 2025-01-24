
type Project = {
  id: string;
  name: string;
  deadline: string;
  progress: number;
};


let projects: Project[] = [
  { id: '1', name: 'Project A', deadline: '2023-12-31', progress: 25 },
  { id: '2', name: 'Project B', deadline: '2023-11-30', progress: 50 },
];


export const fetchProjectsAPI = async (): Promise<Project[]> => {
  return projects;
};

export const addProjectAPI = async (newProject): Promise<Project> => {
  const projectWithId: Project = { ...newProject, id: Date.now().toString() };
  projects.push(projectWithId);
  return projectWithId;
};

// Edit an existing project
export const editProjectAPI = async (updatedProject: Project): Promise<Project> => {
  const index = projects.findIndex((p) => p.id === updatedProject.id);
  if (index !== -1) {
    projects[index] = updatedProject;
    return updatedProject;
  } else {
    throw new Error('Project not found');
  }
};

// Delete a project by ID
export const deleteProjectAPI = async (projectId: string): Promise<void> => {
  projects = projects.filter((p) => p.id !== projectId);
};
