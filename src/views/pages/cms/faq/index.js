import { useState, useEffect } from 'react';
import { Box, Button, useTheme, useMediaQuery, Divider, Tooltip, IconButton, Typography } from '@mui/material';
import { IconCirclePlus as AddIcon, IconPencil as UpdateIcon, IconTrash as DeleteIcon } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// Components
import DataTable from 'components/DataTable';
import Modal from 'components/ResponsiveModal';
import MainCard from '../../../../ui-component/cards/MainCard';
import NotFoundCard from 'components/NotFoundCard';
import CreateFAQ from './components/Forms/CreateFAQ';
import UpdateFAQ from './components/Forms/UpdateFAQ';
import DeleteConfirmation from './components/Dialog/DeleteConfirmation';

import { setDataIndex } from 'store/reducers/cms/faq.reducer';
import { getFAQ } from 'store/thunk/cms/faq.thunk';
import AlertComponent from 'components/Alert';

function FAQ() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const faq = useSelector((state) => state.faq);

    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const [openModal, setOpenModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [pageLmit, setpageLmit] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [faqId, setFAQId] = useState();
    const [faqIdx, setFAQIdx] = useState();

    function handleUpdateModal(idx) {
        setFAQIdx(idx);
        setUpdateModal(!updateModal);
    }

    console.log(faqId, faqIdx);

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
            name: 'QUESTION',
            label: 'QUESTION',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'ANSWER',
            label: 'ANSWER',
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
                                    setFAQId(faq.data[dataIndex].FAQ_ID);
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
        count: faq.totalRecords,
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
        dispatch(getFAQ({ pageno: pageNo, limit: pageLmit }));
    }, []);

    return (
        <>
            <Box>
                <MainCard
                    title={!isMobileDevice && 'FAQ'}
                    secondary={
                        <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
                            Add FAQ
                        </Button>
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
                                Add FAQ
                            </Button>
                            <Divider />
                        </>
                    )}
                    <Box>
                        {faq.data.length > 0 ? (
                            <DataTable title="Games List" data={faq.data} columns={columns} options={options} />
                        ) : (
                            <NotFoundCard msg="Sorry, No data found" />
                        )}
                    </Box>
                </MainCard>

                {faq.status === 'failed' && <AlertComponent status="false" message={faq.msg} />}
                {faq.status === 'success' && <AlertComponent status="true" message={faq.msg} />}

                <Modal title="Add New FAQ" open={openModal} onClose={() => setOpenModal(!openModal)}>
                    <CreateFAQ
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        theme={theme}
                    />
                </Modal>

                <Modal title="Update FAQ" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                    <UpdateFAQ
                        faq={faq}
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={updateModal}
                        setOpenModal={setUpdateModal}
                        theme={theme}
                        faqIndex={faqIdx}
                    />
                </Modal>
            </Box>

            {/* Delete confirmation dialog */}
            <Box>
                <DeleteConfirmation dispatch={dispatch} openDialog={openDialog} setOpenDialog={setOpenDialog} faqId={faqId} />
            </Box>
        </>
    );
}

export default FAQ;
