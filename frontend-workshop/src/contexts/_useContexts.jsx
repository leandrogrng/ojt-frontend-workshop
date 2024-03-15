import { useContext } from 'react';
import { CompanyContext } from './Company';
import { ResourceContext } from './Resources';

const useCompany = () => useContext(CompanyContext);
const useProject = () => useContext(ProjectContext);
const useResources = () => useContext(ResourceContext);

export { useCompany, useProject, useResources };
