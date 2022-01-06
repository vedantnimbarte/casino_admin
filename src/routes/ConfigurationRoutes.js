import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// configuration routing
const RolesPage = Loadable(lazy(() => import('views/pages/configuration/roles')));
const PermissionsPage = Loadable(lazy(() => import('views/pages/configuration/permissions')));
const LoyaltyPointsPage = Loadable(lazy(() => import('views/pages/configuration/loyaltyPoints')));

// ==============================|| MAIN ROUTING ||============================== //

const ConfigurationRoutes = {
    path: '/configuration',
    element: <MainLayout />,
    children: [
        {
            path: '/roles',
            element: <RolesPage />
        },
        {
            path: '/permissions',
            element: <PermissionsPage />
        },
        {
            path: '/loyalty-points',
            element: <LoyaltyPointsPage />
        }
    ]
};

export default ConfigurationRoutes;
