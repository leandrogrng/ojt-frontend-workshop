import { useContext } from 'react';
import { CompanyContext } from './Company';
import { ResourceContext } from './Resources';
import { ProjectsContext } from './Projects';
import { RequestContext }from './Requests';

const useCompany = () => useContext(CompanyContext);
const useProject = () => useContext(ProjectsContext);
const useResources = () => useContext(ResourceContext);
const useRequest = () => useContext(RequestContext);

export { useCompany, useProject, useResources, useRequest };
