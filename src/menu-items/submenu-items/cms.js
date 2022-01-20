import {
    IconBallBasketball as GamesGroupIcon,
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
        id: 'games-type',
        title: 'Game Types',
        type: 'item',
        url: '/cms/game-group',
        breadcrumbs: false,
        icon: icons.GamesGroupIcon
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
        id: 'faq',
        title: 'FAQ',
        type: 'item',
        url: '/cms/faq',
        breadcrumbs: false,
        icon: icons.FAQIcon
    },

    {
        id: 'disclaimer',
        title: 'Disclaimer',
        type: 'item',
        url: '/cms/disclaimer',
        breadcrumbs: false,
        icon: icons.DocumentIcon
    },
    {
        id: 'notification',
        title: 'Notifications',
        type: 'item',
        url: '/cms/notification',
        breadcrumbs: false,
        icon: icons.NotificationIcon
    }
];

export default cmsMenuItems;
