import { useContext } from 'react';
import { CompanyContext } from './Company';
import { ResourceContext } from './Resources';
import { ProjectsContext } from './Projects';

const useCompany = () => useContext(CompanyContext);
const useProject = () => useContext(ProjectsContext);
const useResources = () => useContext(ResourceContext);

export { useCompany, useProject, useResources };