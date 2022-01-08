import {
    IconSitemap as RoleIcon,
    IconPercentage as CommissionIcon,
    IconCertificate as PermissionIcon,
    IconBoxMultiple2 as LoyaltyPointsIcon,
    IconMenu2 as MenuIcon,
    IconLicense as MenuPermissionIcon,
    IconPackage as GamePackIcon
} from '@tabler/icons';

const icons = { RoleIcon, CommissionIcon, PermissionIcon, LoyaltyPointsIcon, MenuIcon, MenuPermissionIcon, GamePackIcon };

const configurationMenuItems = [
    {
        id: 'agent_type',
        title: 'Agent Type',
        type: 'item',
        url: '/configuration/roles',
        breadcrumbs: false,
        icon: icons.RoleIcon
    },
    // {
    //     id: 'commission-plans',
    //     title: 'Commission Plans',
    //     type: 'item',
    //     url: '/configuration/commission',
    //     breadcrumbs: false,
    //     icon: icons.CommissionIcon
    // },
    {
        id: 'permissions',
        title: 'Permissions',
        type: 'item',
        url: '/configuration/permissions',
        breadcrumbs: false,
        icon: icons.PermissionIcon
    },
    {
        id: 'loyalty_points',
        title: 'Loyalty Points',
        type: 'item',
        url: '/configuration/loyalty-points',
        breadcrumbs: false,
        icon: icons.LoyaltyPointsIcon
    },
    {
        id: 'menu',
        title: 'Menu',
        type: 'item',
        url: '/configuration/menu',
        breadcrumbs: false,
        icon: icons.MenuIcon
    },
    {
        id: 'game_pack',
        title: 'Game Pack',
        type: 'item',
        url: '/configuration/game-pack',
        breadcrumbs: false,
        icon: icons.GamePackIcon
    },
    {
        id: 'menu_permissions',
        title: 'Menu Permissions',
        type: 'item',
        url: '/configuration/menu-permissions',
        breadcrumbs: false,
        icon: icons.MenuPermissionIcon
    }
];

export default configurationMenuItems;
