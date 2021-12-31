// assets
import {
    IconDashboard as DashboardIcon,
    IconDatabase as CMSIcon,
    IconSettings as ConfigIcon,
    IconTournament as AgentTreeIcon,
    IconUsers as NetworkIcon,
    IconCurrencyDollar as TransactionIcon,
    IconUser as PlayerIcon
} from '@tabler/icons';

// submenu items
import { configurationMenuItems, cmsMenuItems } from './submenu-items';

// constant
const icons = { DashboardIcon, CMSIcon, ConfigIcon, AgentTreeIcon, TransactionIcon, PlayerIcon, NetworkIcon };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.DashboardIcon,
            breadcrumbs: false
        },
        {
            id: 'network',
            title: 'Network',
            type: 'item',
            url: '/network',
            icon: icons.NetworkIcon,
            breadcrumbs: false
        },
        {
            id: 'agent_tree',
            title: 'Agent Tree',
            type: 'item',
            url: '/agent-tree',
            icon: icons.AgentTreeIcon,
            breadcrumbs: false
        },
        {
            id: 'players',
            title: 'Players',
            type: 'item',
            url: '/player',
            icon: icons.PlayerIcon,
            breadcrumbs: false
        },
        {
            id: 'transaction',
            title: 'Transaction',
            type: 'item',
            url: '/transaction',
            icon: icons.TransactionIcon,
            breadcrumbs: false
        },
        {
            id: 'configuration',
            title: 'Configuration',
            type: 'collapse',
            icon: icons.ConfigIcon,
            children: [...configurationMenuItems]
        },
        {
            id: 'cms',
            title: 'CMS',
            type: 'collapse',
            icon: icons.CMSIcon,
            children: [...cmsMenuItems]
        }
    ]
};

export default dashboard;
