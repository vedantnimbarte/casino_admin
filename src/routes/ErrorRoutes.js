import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// configuration routing
const Error404Page = Loadable(lazy(() => import('views/pages/error/404')));

// ==============================|| MAIN ROUTING ||============================== //

const ErrorRoutes = {
    path: '*',
    element: <MainLayout />,
    children: [
        {
            path: '*',
            element: <Error404Page />
        }
    ]
};

export default ErrorRoutes;
