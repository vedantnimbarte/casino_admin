import {
    IconTournament as GamesGroupIcon,
    IconSlideshow as SliderIcon,
    IconBell as NotificationIcon,
    IconQuestionMark as FAQIcon,
    IconBallAmericanFootball as GamesIcon,
    IconLicense as DocumentIcon,
    IconFileInfo as AboutUsIcon
} from '@tabler/icons';

const icons = { SliderIcon, GamesIcon, GamesGroupIcon, FAQIcon, NotificationIcon, DocumentIcon, AboutUsIcon };

const cmsMenuItems = [
    {
        id: 'slider',
        title: 'Slider',
        type: 'item',
        url: '/cms/slider',
        breadcrumbs: false,
        icon: icons.SliderIcon
    },
    {
        id: 'games',
        title: 'Games',
        type: 'item',
        url: '/cms/game',
        breadcrumbs: false,
        icon: icons.GamesIcon
    },
    {
        id: 'games-group',
        title: 'Game Groups',
        type: 'item',
        url: '/cms/game-group',
        breadcrumbs: false,
        icon: icons.GamesGroupIcon
    },
    {
        id: 'faq',
        title: 'FAQ',
        type: 'item',
        url: '/cms/faq',
        breadcrumbs: false,
        icon: icons.FAQIcon
    },
    {
        id: 'notification',
        title: 'Notifications',
        type: 'item',
        url: '/cms/notification',
        breadcrumbs: false,
        icon: icons.NotificationIcon
    },
    {
        id: 'terms-conditions',
        title: 'Terms & Conditions',
        type: 'item',
        url: '/cms/terms-conditions',
        breadcrumbs: false,
        icon: icons.DocumentIcon
    },
    {
        id: 'payment-terms',
        title: 'Payment Terms',
        type: 'item',
        url: '/cms/payment-terms',
        breadcrumbs: false,
        icon: icons.DocumentIcon
    },
    {
        id: 'privacy-policy',
        title: 'Privacy Policy',
        type: 'item',
        url: '/cms/privacy-policy',
        breadcrumbs: false,
        icon: icons.DocumentIcon
    },
    {
        id: 'about-us',
        title: 'About Us',
        type: 'item',
        url: '/cms/about',
        breadcrumbs: false,
        icon: icons.AboutUsIcon
    },
    {
        id: 'disclaimer',
        title: 'Disclaimer',
        type: 'item',
        url: '/cms/disclaimer',
        breadcrumbs: false,
        icon: icons.DocumentIcon
    }
];

export default cmsMenuItems;
