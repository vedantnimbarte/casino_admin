import {
    IconSitemap as RoleIcon,
    IconPercentage as CommissionIcon,
    IconCertificate as PermissionIcon,
    IconBoxMultiple2 as LoyaltyPointsIcon
} from '@tabler/icons';

const icons = { RoleIcon, CommissionIcon, PermissionIcon, LoyaltyPointsIcon };

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
    }
];

export default configurationMenuItems;
