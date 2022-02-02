import { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Button, Paper, useMediaQuery, useTheme, Divider, Typography, Tooltip, IconButton } from '@mui/material';
import { IconCirclePlus as AddIcon, IconPencil as UpdateIcon, IconTrash as DeleteIcon, IconBan as BlockIcon } from '@tabler/icons';
import { useLocation } from 'react-router';
import moment from 'moment';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getAgent } from 'store/thunk/network/agent.thunk';
import { clearAgentList, setDataIndex } from 'store/reducers/network/agent.reducer';

// Components
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';

import Modal from './components/Modal';
import TabPanel from './components/TabPanel';
import AlertComponent from 'components/Alert';
import UpdateAgent from './components/Forms/UpdateAgent';
import CreateAgent from './components/Forms/NewAgent';
import { getAgentTypesList } from 'store/thunk/configuration/agentType.thunk';
import DeleteConfirmation from './components/Dialog/DeleteConfirmation';
import BlockConfirmation from './components/Dialog/BlockConfirmation';

function Network() {
    const agent = useSelector((state) => state.agent);
    const permissions = useSelector((state) => state.permissions);
    const gameType = useSelector((state) => state.gameType);
    const agentType = useSelector((state) => state.agentType);
    const dispatch = useDispatch();

    const { state } = useLocation();
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const [openModal, setOpenModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [blockDialog, setBlockDialog] = useState(false);
    const [agentId, setAgentId] = useState();

    const [value, setValue] = useState(0);

    const [pageLmit, setpageLmit] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [agentIdx, setAgentIdx] = useState();

    function handleUpdateModal(idx) {
        setAgentIdx(idx);
        setUpdateModal(!updateModal);
    }

    const columns = [
        {
            name: 'dataindex',
            label: 'SR NO',
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    const val = dataIndex + 1 + pageLmit * pageNo;
                    return val;
                }
            }
        },
        {
            name: 'AGENT_NAME',
            label: 'NAME',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'AGENT_USERNAME',
            label: 'USERNAME',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'AGENT_EMAIL',
            label: 'EMAIL',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'AGENT_PHONE',
            label: 'PHONE NO',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        // {
        //     name: 'ROLE_ID',
        //     label: 'AGENT TYPE',
        //     options: {
        //         filter: false,
        //         sort: true,
        //         customBodyRender: (value) => <Typography>{value}</Typography>
        //     }
        // },
        {
            name: 'ADDRESS',
            label: 'ADDRESS',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'UPDATE_DATE',
            label: 'LAST UPDATED',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{moment(value).format('DD/MM/YYYY HH:MM A')}</Typography>
            }
        }
        // {
        //     name: 'action',
        //     label: 'Actions',
        //     options: {
        //         filter: false,
        //         sort: false,
        //         customBodyRenderLite: (dataIndex) => (
        //             <>
        //                 <Tooltip title="Update">
        //                     <IconButton
        //                         color="primary"
        //                         onClick={() => {
        //                             dispatch(setDataIndex(dataIndex));
        //                             handleUpdateModal(dataIndex);
        //                         }}
        //                     >
        //                         <UpdateIcon />
        //                     </IconButton>
        //                 </Tooltip>
        //                 <Tooltip title="Block">
        //                     <IconButton
        //                         color="error"
        //                         size="small"
        //                         onClick={() => {
        //                             setBlockDialog(!blockDialog);
        //                             dispatch(setDataIndex(dataIndex));
        //                             setAgentId(agent.data[dataIndex].AGENT_ID);
        //                         }}
        //                     >
        //                         <BlockIcon />
        //                     </IconButton>
        //                 </Tooltip>
        //                 <Tooltip title="Delete">
        //                     <IconButton
        //                         color="error"
        //                         onClick={() => {
        //                             setOpenDialog(!openDialog);
        //                             dispatch(setDataIndex(dataIndex));
        //                             setAgentId(agent.data[dataIndex].AGENT_ID);
        //                         }}
        //                     >
        //                         <DeleteIcon />
        //                     </IconButton>
        //                 </Tooltip>
        //             </>
        //         )
        //     }
        // }
    ];

    const options = {
        filter: true,
        print: false,
        download: false,
        search: false,
        selectableRows: false,
        rowsPerPage: pageLmit,
        pagination: true,
        rowsPerPageOptions: [10, 20, 30],
        serverSide: true,
        count: agent.totalRecords,
        sortThirdClickReset: true,
        jumpToPage: true,
        onChangeRowsPerPage: (page) => {
            setpageLmit(page);
        },
        onChangePage: (page) => {
            setPageNo(page);
        }
    };

    useEffect(() => {
        // dispatch(clearAgentList());
        dispatch(getAgent({ pageno: pageNo, limit: pageLmit, isActive: Boolean(!value) }));
        dispatch(getAgentTypesList());
    }, [pageNo, pageLmit]);

    const handleChange = (event, newValue) => {
        dispatch(clearAgentList());
        dispatch(getAgent({ pageno: pageNo, limit: pageLmit, isActive: Boolean(value) }));
        setValue(newValue);
    };

    useEffect(() => {
        if (state) {
            setOpenModal(!openModal);
        }
    }, [state]);

    return (
        <Box>
            <Paper>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="basic tabs example"
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab label="Agents List" />
                    <Tab label="Pending Approval" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <MainCard
                        title={!isMobileDevice && 'Agents List'}
                        secondary={
                            <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
                                Add Agent
                            </Button>
                        }
                    >
                        {isMobileDevice && (
                            <>
                                <Button
                                    startIcon={<AddIcon />}
                                    onClick={() => setOpenModal(!openModal)}
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    style={{ marginBottom: 15 }}
                                >
                                    Add Agent
                                </Button>
                                <Divider />
                            </>
                        )}
                        <Box>
                            {agent.data.length > 0 ? (
                                <DataTable title="Agents List" data={agent.data} columns={columns} options={options} />
                            ) : (
                                <NotFoundCard msg="Sorry, No data found" />
                            )}
                        </Box>
                    </MainCard>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MainCard title={!isMobileDevice && 'Agents Approval List'}>
                        <Box>
                            {agent.data.length > 0 ? (
                                <DataTable title="Agents Approval List" data={agent.data} columns={columns} options={options} />
                            ) : (
                                <NotFoundCard msg="Sorry, No data found" />
                            )}
                        </Box>
                    </MainCard>
                </TabPanel>
            </Paper>

            {agent.status === 'failed' && <AlertComponent status="false" message={agent.msg} />}
            {agent.status === 'success' && <AlertComponent status="true" message={agent.msg} />}

            <Modal title="Add New Agent" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <CreateAgent
                    open={openModal}
                    onClose={() => setOpenModal(!openModal)}
                    dispatch={dispatch}
                    permissionsList={permissions}
                    gameTypesList={gameType}
                    agent={agent}
                />
            </Modal>

            <Modal title="Update Agent" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                <UpdateAgent
                    agent={agent}
                    permissionsList={permissions}
                    gameTypesList={gameType}
                    open={updateModal}
                    onClose={() => setUpdateModal(!updateModal)}
                    dispatch={dispatch}
                    agentIdx={agentIdx}
                />
            </Modal>

            {/* Delete confirmation dialog */}
            <Box>
                <DeleteConfirmation
                    agent={agent}
                    dispatch={dispatch}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    agentId={agentId}
                />
            </Box>

            {/* Block confirmation dialog */}
            <Box>
                <BlockConfirmation
                    agent={agent}
                    dispatch={dispatch}
                    openDialog={blockDialog}
                    setOpenDialog={setBlockDialog}
                    agentId={agentId}
                />
            </Box>
        </Box>
    );
}

export default Network;
