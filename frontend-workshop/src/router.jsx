import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App'
import Home from './pages/Home/Home'
import ErrorPage from './pages/ErrorPage';
import ResourcesPage from './pages/ResourcesPage';
import CompaniesPage from './pages/CompaniesPage';
import ProjectPage from './pages/ProjectsPage';

const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            { path: '/404', element: <ErrorPage/>},
            { path: "", element: <Home/>},
            { path: '/resources', element: <ResourcesPage/>},
            { path: '/companies', element: <CompaniesPage/>},
            { path: '/projects', element: <ProjectPage/>}
        ]
    },
    
    {
        path: '*',
        element: <Navigate to='/404' replace/>
    }
];

const router = createBrowserRouter(routes);
export default router;