// assets
import {
    IconDashboard as DashboardIcon,
    IconDatabase as CMSIcon,
    IconSettings as ConfigIcon,
    IconUsers as AgentIcon,
    IconCurrencyDollar as TransactionIcon
} from '@tabler/icons';

// submenu items
import { configurationMenuItems, cmsMenuItems } from './submenu-items';

// constant
const icons = { DashboardIcon, CMSIcon, ConfigIcon, AgentIcon, TransactionIcon };

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
        // {
        //     id: 'agent_tree',
        //     title: 'Agent Tree',
        //     type: 'item',
        //     url: '/agent',
        //     icon: icons.AgentIcon,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'transaction',
        //     title: 'Transaction',
        //     type: 'item',
        //     url: '/transaction',
        //     icon: icons.TransactionIcon,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'configuration',
        //     title: 'Configuration',
        //     type: 'collapse',
        //     icon: icons.ConfigIcon,
        //     children: [...configurationMenuItems]
        // },
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
