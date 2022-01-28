import { useState, useEffect } from 'react';
import { Tooltip, Box, Button, useTheme, useMediaQuery, Divider, Typography, IconButton, Avatar } from '@mui/material';
import { IconCirclePlus as AddIcon, IconPencil as UpdateIcon, IconTrash as DeleteIcon } from '@tabler/icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

// Components
import DataTable from 'components/DataTable';
import ModalComponent from 'components/ResponsiveModal';
import MainCard from '../../../../ui-component/cards/MainCard';
import NotFoundCard from 'components/NotFoundCard';
import { getSlider } from 'store/thunk/cms/slider.thunk';
import CreateSlider from './components/Forms/CreateSlider';
import UpdateSlider from './components/Forms/UpdateSlider';
import { setDataIndex } from 'store/reducers/cms/slider.reducer';
import DeleteConfirmation from './components/Dialog/DeleteConfirmation';
import AlertComponent from 'components/Alert';
import { IMAGE_URL } from 'common/constants';

function Slider() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const slider = useSelector((state) => state.slider);
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const [openModal, setOpenModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [pageLmit, setpageLmit] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [sliderId, setSliderId] = useState();
    const [sliderIdx, setSliderIdx] = useState();

    function handleUpdateModal(idx) {
        setSliderIdx(idx);
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
            name: 'SLIDER_IMAGE_URL',
            label: 'IMAGE',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <Avatar src={IMAGE_URL.concat('/public/', value)} alt="" sx={{ width: 100, height: 100 }} />
            }
        },
        {
            name: 'SLIDER_NAME',
            label: 'NAME',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
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
                                    dispatch(setDataIndex(dataIndex));
                                    setSliderId(slider.data[dataIndex].SLIDER_ID);
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
        count: slider.totalRecords,
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
        dispatch(getSlider({ pageno: pageNo, limit: pageLmit }));
    }, []);

    return (
        <>
            <Box>
                <MainCard
                    title={!isMobileDevice && 'Slider'}
                    secondary={
                        <Tooltip title="Add New Slider">
                            <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
                                Add Slider
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
                                Add Slider
                            </Button>
                            <Divider />
                        </>
                    )}
                    <Box>
                        {slider.data.length > 0 ? (
                            <DataTable title="Games List" data={slider.data} columns={columns} options={options} />
                        ) : (
                            <NotFoundCard msg="Sorry, No data found" />
                        )}
                    </Box>
                </MainCard>

                {slider.status === 'failed' && <AlertComponent status="false" message={slider.msg} />}
                {slider.status === 'success' && <AlertComponent status="true" message={slider.msg} />}

                <ModalComponent title="Add New Slider" open={openModal} onClose={() => setOpenModal(!openModal)}>
                    <CreateSlider
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        theme={theme}
                    />
                </ModalComponent>
                <ModalComponent title="Update Slider" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                    <UpdateSlider
                        dispatch={dispatch}
                        openModal={updateModal}
                        setOpenModal={setUpdateModal}
                        theme={theme}
                        sliderIndex={sliderIdx}
                        slider={slider}
                    />
                </ModalComponent>
            </Box>

            {/* Delete confirmation dialog */}
            <Box>
                <DeleteConfirmation dispatch={dispatch} openDialog={openDialog} setOpenDialog={setOpenDialog} sliderId={sliderId} />
            </Box>
        </>
    );
}

export default Slider;
