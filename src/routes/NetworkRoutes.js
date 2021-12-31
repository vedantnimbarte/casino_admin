import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// configuration routing
const AgentsPage = Loadable(lazy(() => import('views/pages/network/agents')));
const AgentTreePage = Loadable(lazy(() => import('views/pages/network/agent-tree')));

// ==============================|| MAIN ROUTING ||============================== //

const NetworkRoutes = {
    path: '/network',
    element: <MainLayout />,
    children: [
        {
            path: '/agents',
            element: <AgentsPage />
        },
        {
            path: '/agent-tree',
            element: <AgentTreePage />
        }
    ]
};

export default NetworkRoutes;
