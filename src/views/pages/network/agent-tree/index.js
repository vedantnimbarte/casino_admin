import { useState } from 'react';
import { IconButton, Box, Button, TextField, MenuItem, useTheme, Grid, Typography } from '@mui/material';
import {
    IconCirclePlus as AddIcon,
    IconDeviceFloppy as SaveIcon,
    IconRefresh as ResetIcon,
    IconCaretRight as NextIcon,
    IconCaretLeft as PreviousIcon
} from '@tabler/icons';
import { Formik, Form } from 'formik';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';
import NotFoundCard from 'components/NotFoundCard';

import roleSchema from 'schema/role.schema';

// __mock__
import md from './__mock__/md';
import d from './__mock__/d';
import sd from './__mock__/sd';
import s from './__mock__/s';

function AgentTree() {
    const [openModal, setOpenModal] = useState(false);
    const theme = useTheme();
    const [agentType, setAgentType] = useState(['Distributor', 'Sub Distributor', 'Store']);
    const [agents, setAgents] = useState(['Master Distributor']);
    const [data, setData] = useState(md);

    // const columns = ['role', 'username', 'players', 'pending_balance', 'total_earned', 'total_commission', 'action'];

    const options = {
        filter: false,
        print: false,
        download: false,
        search: false,
        selectableRows: false,
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 20]
    };

    const handleAgentChange = (agent) => {
        if (agent) {
            agents.length = agents.indexOf(agent) + 1;
            if (agent === 'Master Distributor') {
                setData(md);
            }
            if (agent === 'Distributor') {
                setData(d);
            }
            if (agent === 'Sub Distributor') {
                setData(sd);
            }
            if (agent === 'Store') {
                setData(s);
            }
        }
        if (!agent) {
            if (agentType.length) {
                const agent = agentType.shift();

                setAgents([...agents, agent]);
                if (agent === 'Distributor') {
                    setData(d);
                }
                if (agent === 'Sub Distributor') {
                    setData(sd);
                }
                if (agent === 'Store') {
                    setData(s);
                }
            }
        }
    };

    const columns = [
        {
            name: 'role',
            label: 'Role',
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    const val = data[dataIndex].role;
                    return val;
                }
            }
        },
        {
            name: 'username',
            label: 'Username',
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    const val = data[dataIndex].username;
                    return val;
                }
            }
        },
        {
            name: 'players',
            label: 'Players',
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    const val = data[dataIndex].players;
                    return val;
                }
            }
        },
        {
            name: 'pending_balance',
            label: 'Pending Balance',
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    const val = data[dataIndex].pending_balance;
                    return val;
                }
            }
        },
        {
            name: 'total_earned',
            label: 'Pending Earned',
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    const val = data[dataIndex].total_earned;
                    return val;
                }
            }
        },
        {
            name: 'total_commission',
            label: 'Total Commission',
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    const val = data[dataIndex].total_commission;
                    return val;
                }
            }
        },
        {
            name: 'action',
            label: 'Action',
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    const val = (
                        <IconButton onClick={() => handleAgentChange()}>
                            <NextIcon />
                        </IconButton>
                    );
                    console.log();
                    return agents[agents.length - 1] !== 'Store' ? val : '';
                }
            }
        }
    ];

    return (
        <Box>
            <MainCard title="Agent Tree">
                <Box>
                    <Box style={{ display: 'flex' }}>
                        {agents.map((agent) => (
                            <Box style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{ color: 'white', borderRadius: 100 }}
                                    onClick={() => handleAgentChange(agent)}
                                >
                                    {agent}
                                </Button>
                                <PreviousIcon />
                            </Box>
                        ))}
                    </Box>
                    {data.length > 0 ? (
                        <DataTable title="Agent Types" data={data} columns={columns} options={options} />
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>
        </Box>
    );
}

export default AgentTree;
