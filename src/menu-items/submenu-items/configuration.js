import { IconUserExclamation as RoleIcon, IconPercentage as CommissionIcon, IconCertificate as PermissionIcon } from '@tabler/icons';

const icons = { RoleIcon, CommissionIcon, PermissionIcon };

const configurationMenuItems = [
    {
        id: 'roles',
        title: 'Roles',
        type: 'item',
        url: '/configuration/roles',
        breadcrumbs: false,
        icon: icons.RoleIcon
    },
    {
        id: 'commission-plans',
        title: 'Commission Plans',
        type: 'item',
        url: '/configuration/commission',
        breadcrumbs: false,
        icon: icons.CommissionIcon
    },
    {
        id: 'permissions',
        title: 'Permissions',
        type: 'item',
        url: '/configuration/permissions',
        breadcrumbs: false,
        icon: icons.PermissionIcon
    }
];

export default configurationMenuItems;
