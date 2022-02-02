import { useState, useEffect } from 'react';
import { Tooltip, Box, Button, useTheme, useMediaQuery, Divider, Typography, IconButton } from '@mui/material';
import { IconCirclePlus as AddIcon, IconPencil as UpdateIcon, IconTrash as DeleteIcon } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

// Components
import DataTable from 'components/DataTable';
import ModalComponent from 'components/ResponsiveModal';
import MainCard from '../../../../ui-component/cards/MainCard';
import NotFoundCard from 'components/NotFoundCard';
import CreateLoyaltyPack from './components/Forms/CreateLoyaltyPack';
import UpdateLoyaltyPack from './components/Forms/UpdateLoyaltyPack';
import DeleteConfirmation from './components/Dialog/DeleteConfirmation';
import { getLoyaltyPack } from 'store/thunk/configuration/loyaltyPack.thunk';
import { setDataIndex } from 'store/reducers/configuration/loyaltyPack.reducer';
import AlertComponent from 'components/Alert';

function LoyaltyPoints() {
    const dispatch = useDispatch();
    const loyaltyPack = useSelector((state) => state.loyaltyPack);
    const [openModal, setOpenModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const [loyaltyPackId, setLoyaltyPackId] = useState();
    const [loyaltyPackIdx, setLoyaltyPackIdx] = useState();
    const [pageLmit, setpageLmit] = useState(10);
    const [pageNo, setPageNo] = useState(0);

    function handleUpdateModal(idx) {
        setLoyaltyPackIdx(idx);
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
            name: 'LOYALTY_NAME',
            label: 'LOYALTY LEVEL',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'LOYALTY_POINTS',
            label: 'POINTS NEEDED',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'LOYALTY_MULTIPLIER',
            label: 'MULTIPLIER',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'LOYALTY_MULTIPLIER',
            label: 'WAGERING VALUE',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Typography>
                        ${1} = {1 * tableMeta.rowData[3]} Loyalty Points
                    </Typography>
                )
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
                                    setLoyaltyPackId(loyaltyPack.data[dataIndex].LOYALTY_ID);
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
        count: loyaltyPack.totalRecords,
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
        dispatch(getLoyaltyPack({ pageno: pageNo, limit: pageLmit }));
    }, [pageLmit, pageNo]);

    return (
        <>
            <Box>
                <MainCard
                    title={!isMobileDevice && 'Loyalty Points'}
                    secondary={
                        <Tooltip title="Add New Loyalty Level">
                            <Button
                                startIcon={<AddIcon />}
                                onClick={() => setOpenModal(!openModal)}
                                variant="contained"
                                color="secondary"
                                id="add-new-loyalty-level"
                            >
                                Add Loyalty Level
                            </Button>
                        </Tooltip>
                    }
                >
                    {isMobileDevice && (
                        <>
                            <Button
                                startIcon={<AddIcon />}
                                fullWidth
                                style={{ marginBottom: 15 }}
                                onClick={() => setOpenModal(!openModal)}
                                variant="contained"
                                color="secondary"
                            >
                                Add Loyalty Level
                            </Button>
                            <Divider />
                        </>
                    )}
                    <Box>
                        {loyaltyPack.data.length > 0 ? (
                            <DataTable title="Loyalty Levels List" data={loyaltyPack.data} columns={columns} options={options} />
                        ) : (
                            <NotFoundCard msg="Sorry, No data found" />
                        )}
                    </Box>
                </MainCard>

                {loyaltyPack.status === 'failed' && <AlertComponent status="false" message={loyaltyPack.msg} />}
                {loyaltyPack.status === 'success' && <AlertComponent status="true" message={loyaltyPack.msg} />}

                <ModalComponent title="Add New Loyalty Level" open={openModal} onClose={() => setOpenModal(!openModal)}>
                    <CreateLoyaltyPack
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        theme={theme}
                    />
                </ModalComponent>
                <ModalComponent title="Update Loyalty Level" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                    <UpdateLoyaltyPack
                        loyaltyPack={loyaltyPack}
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={updateModal}
                        setOpenModal={setUpdateModal}
                        theme={theme}
                        loyaltyPackIndex={loyaltyPackIdx}
                    />
                </ModalComponent>
            </Box>

            {/* Delete confirmation dialog */}
            <Box>
                <DeleteConfirmation
                    loyaltyPack={loyaltyPack}
                    dispatch={dispatch}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    loyaltyPackId={loyaltyPackId}
                />
            </Box>
        </>
    );
}

export default LoyaltyPoints;
