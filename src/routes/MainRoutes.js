import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// main routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const TransactionPage = Loadable(lazy(() => import('views/pages/transaction')));

const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

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
            path: '*',
            element: <AuthRegister3 />
        }
    ]
};

export default MainRoutes;
