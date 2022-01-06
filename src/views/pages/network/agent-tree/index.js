import { useState } from 'react';
import { IconButton, Box, Tabs, Tab, Typography } from '@mui/material';
import { IconCaretRight as NextIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';

// __mock__
import md from './__mock__/md';
import d from './__mock__/d';
import sd from './__mock__/sd';
import s from './__mock__/s';
import { useTheme } from '@mui/system';

function AgentTree() {
    const [agentType, setAgentType] = useState(['Distributor', 'Sub Distributor', 'Store']);
    const [agents, setAgents] = useState(['Master Distributor']);
    const [data, setData] = useState(md);
    const theme = useTheme();
    const [value, setValue] = useState(0);

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
        agents.length = agents.indexOf(agents[newValue]) + 1;
        if (agents[newValue] === 'Master Distributor') {
            setData(md);
        }
        if (agents[newValue] === 'Distributor') {
            setData(d);
        }
        if (agents[newValue] === 'Sub Distributor') {
            setData(sd);
        }
        if (agents[newValue] === 'Store') {
            setData(s);
        }
    };

    const handleAgentChange = (agent) => {
        let idx = value;
        idx += 1;
        setValue(idx);
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
                customBodyRenderLite: () => {
                    const val = (
                        <IconButton onClick={() => handleAgentChange()}>
                            <NextIcon />
                        </IconButton>
                    );
                    return agents[agents.length - 1] !== 'Store' ? val : '';
                }
            }
        }
    ];

    return (
        <Box>
            <MainCard title="Agent Tree">
                <Box>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        TabIndicatorProps={{ style: { display: 'none' } }}
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="scrollable force tabs example"
                        style={{ marginBottom: 15, width: '100%', display: 'flex', alignItems: 'center' }}
                    >
                        {agents.map((agent) => (
                            <Tab
                                label={
                                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography>{agent}</Typography>
                                        <NextIcon />
                                    </Box>
                                }
                                style={{
                                    backgroundColor: theme.palette.secondary.dark,
                                    color: 'white',
                                    borderRadius: 5,
                                    marginRight: 10
                                }}
                            />
                        ))}
                    </Tabs>
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
