import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// cms routing
const FAQPage = Loadable(lazy(() => import('views/pages/cms/faq')));
const GamesPage = Loadable(lazy(() => import('views/pages/cms/games')));
const SliderPage = Loadable(lazy(() => import('views/pages/cms/slider')));
const NotificationPage = Loadable(lazy(() => import('views/pages/cms/notification')));
const TermsAndConditionsPage = Loadable(lazy(() => import('views/pages/cms/termsAndConditions')));
const DisclaimerPage = Loadable(lazy(() => import('views/pages/cms/disclaimer')));
const AboutUsPage = Loadable(lazy(() => import('views/pages/cms/aboutUs')));
const PaymentTermsPage = Loadable(lazy(() => import('views/pages/cms/paymentTerms')));
const PrivacyPolicyPage = Loadable(lazy(() => import('views/pages/cms/privacyPolicy')));
const GameGroupPage = Loadable(lazy(() => import('views/pages/cms/gameGroup')));

// configuration routing
const RolesPage = Loadable(lazy(() => import('views/pages/configuration/roles')));
const PermissionsPage = Loadable(lazy(() => import('views/pages/configuration/permissions')));
const CommissionPlansPage = Loadable(lazy(() => import('views/pages/configuration/commissionPlans')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
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
            path: '/faq',
            element: <FAQPage />
        },
        {
            path: '/game',
            element: <GamesPage />
        },
        {
            path: '/game-group',
            element: <GameGroupPage />
        },
        {
            path: '/slider',
            element: <SliderPage />
        },
        {
            path: '/notification',
            element: <NotificationPage />
        },
        {
            path: '/privacy-policy',
            element: <PrivacyPolicyPage />
        },
        {
            path: '/about',
            element: <AboutUsPage />
        },
        {
            path: '/disclaimer',
            element: <DisclaimerPage />
        },
        {
            path: '/payment-terms',
            element: <PaymentTermsPage />
        },
        {
            path: '/terms-conditions',
            element: <TermsAndConditionsPage />
        },
        {
            path: '/roles',
            element: <RolesPage />
        },
        {
            path: '/permissions',
            element: <PermissionsPage />
        },
        {
            path: '/commission',
            element: <CommissionPlansPage />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '*',
            element: <AuthRegister3 />
        }
    ]
};

export default MainRoutes;
