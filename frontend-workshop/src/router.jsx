import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App'
import Home from './pages/Home/Home'
import ErrorPage from './pages/ErrorPage';
import ResourcesPage from './pages/ResourcesPage';
import CompaniesPage from './pages/CompaniesPage';
import ProjectPage from './pages/ProjectsPage';
import ViewResource from './pages/ViewResource';
import ViewCompanies from './pages/ViewCompanies';
import ViewProjects from './pages/ViewProjects';
import ViewRequests from './pages/ViewRequests/';
import RequestPage from './pages/RequestPage';

const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            { path: "", element: <Home/>},
            { path: '/404', element: <ErrorPage/>},
            { path: '/resources', element: <ResourcesPage/>},
            { path: '/resources/:id', element: <ViewResource />},
            { path: '/companies', element: <CompaniesPage/>},
            { path: '/companies/:id', element: <ViewCompanies/>},
            { path: '/projects', element: <ProjectPage/>},
            { path: '/projects/:id', element: <ViewProjects/>},
            { path: '/requests', element: <RequestPage/>},
            { path: '/requests/:id', element: <ViewRequests/>}
            
        ]
    },  
    {
        path: '*',
        element: <Navigate to='/404' replace/>
    }
];

const router = createBrowserRouter(routes);
export default router;