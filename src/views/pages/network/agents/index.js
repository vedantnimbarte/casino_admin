import { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Button, Paper, useMediaQuery, useTheme, Divider, Typography, Tooltip, IconButton } from '@mui/material';
import { IconCirclePlus as AddIcon, IconPencil as UpdateIcon, IconTrash as DeleteIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import { useLocation } from 'react-router';
import moment from 'moment';

import agentSchema from 'schema/agent.schema';

// __mock__ data
import approvalList from './__mock__/approval-list';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getAgent } from 'store/thunk/network/agent.thunk';
import { setDataIndex } from 'store/reducers/network/agent.reducer';

// Components
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';
import Modal from 'components/ResponsiveModal';

import TabPanel from './components/TabPanel';
import AlertComponent from 'components/Alert';
import UpdateAgent from './components/Forms/UpdateAgent';
import CreateAgent from './components/Forms/NewAgent';
import { getPermissions } from 'store/thunk/configuration/permissions.thunk';

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
            name: 'MENU_NAME',
            label: 'NAME',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'MENU_SLUG',
            label: 'URL',
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
        },
        {
            name: 'action',
            label: 'Actions',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex) => (
                    <>
                        <Tooltip title="Update">
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    dispatch(setDataIndex(dataIndex));
                                    handleUpdateModal(dataIndex);
                                }}
                            >
                                <UpdateIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton
                                color="error"
                                onClick={() => {
                                    setOpenDialog(!openDialog);
                                    dispatch(setDataIndex(dataIndex));
                                    setAgentId(agent.data[dataIndex].AGENT_ID);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
        }
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
        dispatch(getAgent({ pageno: pageNo, limit: pageLmit }));
    }, [pageNo, pageLmit]);

    const handleChange = (event, newValue) => {
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
                            {approvalList.length > 0 ? (
                                <DataTable title="Agents Approval List" data={approvalList} columns={columns} options={options} />
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
                    agentType={agentType}
                />
            </Modal>

            {/* <Modal title="Update Agent" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                <UpdateAgent
                    agent={agent}
                    open={updateModal}
                    onClose={() => setUpdateModal(!updateModal)}
                    dispatch={dispatch}
                    agentIdx={agentIdx}
                />
            </Modal> */}
        </Box>
    );
}

export default Network;
