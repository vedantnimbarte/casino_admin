import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

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
const PreviewPage = Loadable(lazy(() => import('components/Preview')));

// ==============================|| MAIN ROUTING ||============================== //

const CMSRoutes = {
    path: '/cms',
    element: <MainLayout />,
    children: [
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
            path: '/preview',
            element: <PreviewPage />
        }
    ]
};

export default CMSRoutes;
