import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// main routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const TransactionPage = Loadable(lazy(() => import('views/pages/transaction')));
const PlayerPage = Loadable(lazy(() => import('views/pages/player')));
const ChangePassword = Loadable(lazy(() => import('views/pages/changePassword')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/transaction',
            element: <TransactionPage />
        },
        {
            path: '/player',
            element: <PlayerPage />
        },
        {
            path: '/password',
            element: <ChangePassword />
        }
    ]
};

export default MainRoutes;
