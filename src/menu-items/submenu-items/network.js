import { IconUsers as AgentIcon, IconTournament as AgentTreeIcon } from '@tabler/icons';

const icons = { AgentIcon, AgentTreeIcon };

const networkMenuItems = [
    {
        id: 'agents',
        title: 'Agents',
        type: 'item',
        url: '/network/agents',
        breadcrumbs: false,
        icon: icons.AgentIcon
    },
    {
        id: 'agent-tree',
        title: 'Agent Tree',
        type: 'item',
        url: '/network/agent-tree',
        breadcrumbs: false,
        icon: icons.AgentTreeIcon
    }
];

export default networkMenuItems;
