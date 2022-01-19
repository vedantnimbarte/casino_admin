import { useEffect, useState } from 'react';
import { Tooltip, Box, Button, useTheme, useMediaQuery, Divider, LinearProgress, Typography, IconButton } from '@mui/material';
import { IconCirclePlus as AddIcon, IconPencil as UpdateIcon, IconTrash as DeleteIcon } from '@tabler/icons';
import moment from 'moment';

// Redux + Thunk functions
import { useSelector, useDispatch } from 'react-redux';
import { getAgentType } from 'store/thunk/configuration/agentType.thunk';
import { setDataIndex } from 'store/reducers/configuration/agentType.reducer';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/ResponsiveModal';
import NotFoundCard from 'components/NotFoundCard';
import AlertComponent from 'components/Alert';
import UpdateAgentType from './components/Forms/UpdateAgentType';

// Schema
import roleSchema from 'schema/role.schema';
import CreateAgentType from './components/Forms/CreateAgentType';
import DeleteConfirmation from './components/Dialog/DeleteConfirmation';

function Roles() {
    const [openModal, setOpenModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [agentTypeIdx, setAgentTypeIdx] = useState();
    const theme = useTheme();
    const agentType = useSelector((state) => state.agentType);
    const dispatch = useDispatch();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const [pageLmit, setpageLmit] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [roleId, setRoleId] = useState();

    function handleUpdateModal(idx) {
        setAgentTypeIdx(idx);
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
            name: 'ROLE_NAME',
            label: 'AGENT TYPE',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'MASTER_ROLE_NAME',
            label: 'PARENT AGENT',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <Typography>{value?.split(',')[0]}</Typography>
            }
        },
        {
            name: 'DESCRIPTION',
            label: 'DESCRIPTION',
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
                                    setRoleId(agentType.data[dataIndex].ROLE_ID);
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
        count: agentType.totalRecords,
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
        dispatch(getAgentType({ pageno: pageNo, limit: pageLmit }));
    }, [pageLmit, pageNo]);

    return (
        <>
            <Box>
                {agentType.status === 'loading' ? (
                    <LinearProgress fullWidth style={{ marginBottom: 5 }} color="secondary" />
                ) : (
                    <Box style={{ marginBottom: 10 }} />
                )}
                <MainCard
                    title={!isMobileDevice && 'Agent Type'}
                    secondary={
                        <Tooltip title="Add New Agent Type">
                            <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
                                Add Agent Type
                            </Button>
                        </Tooltip>
                    }
                >
                    {isMobileDevice && (
                        <>
                            <Button
                                startIcon={<AddIcon />}
                                fullWidth
                                onClick={() => setOpenModal(!openModal)}
                                variant="contained"
                                color="secondary"
                                style={{ marginBottom: 15 }}
                            >
                                Add Agent Type
                            </Button>
                            <Divider />
                        </>
                    )}

                    <Box>
                        {agentType.data?.length > 0 ? (
                            <DataTable title="Agent Types" data={agentType.data} columns={columns} options={options} />
                        ) : (
                            <NotFoundCard msg="Sorry, No data found" />
                        )}
                    </Box>
                </MainCard>

                {agentType.status === 'failed' && <AlertComponent status="false" message={agentType.msg} />}
                {agentType.status === 'success' && <AlertComponent status="true" message={agentType.msg} />}

                <Modal title="Update Agent Type" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                    <UpdateAgentType
                        agentType={agentType}
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={updateModal}
                        setOpenModal={setUpdateModal}
                        theme={theme}
                        agentTypeIndex={agentTypeIdx}
                        roleSchema={roleSchema}
                        pageNo={pageNo}
                        pageLimit={pageLmit}
                    />
                </Modal>

                <Modal title="Add New Agent Type" open={openModal} onClose={() => setOpenModal(!openModal)}>
                    <CreateAgentType
                        agentType={agentType}
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        theme={theme}
                        roleSchema={roleSchema}
                        pageNo={pageNo}
                        pageLimit={pageLmit}
                    />
                </Modal>
            </Box>
            {/* Delete confirmation dialog */}
            <Box>
                <DeleteConfirmation
                    agentType={agentType}
                    dispatch={dispatch}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    roleId={roleId}
                />
            </Box>
        </>
    );
}

export default Roles;
