import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, useMediaQuery, useTheme, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { IconCirclePlus as AddIcon, IconPencil as UpdateIcon, IconTrash as DeleteIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import { useLocation } from 'react-router';
import moment from 'moment';

import playerSchema from 'schema/player.schema';

// __mock__ data
import playersList from './__mock__/player-list';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers } from 'store/thunk/player.thunk';
import { setDataIndex } from 'store/reducers/player.reducer';

// Components
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';
import Modal from 'components/ResponsiveModal';
import AlertComponent from 'components/Alert';

import NewPlayerForm from './components/Forms/NewPlayer';

function Players() {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const players = useSelector((state) => state.players);

    const { state } = useLocation();

    const [openModal, setOpenModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [pageLmit, setpageLmit] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [playerId, setPlayerId] = useState();
    const [gameIdx, setGameIdx] = useState();

    const formik = useFormik({
        initialValues: { username: '', name: '', email: '', password: '', confirm_password: '', phone_no: '', agent: '' },
        validationSchema: playerSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    useEffect(() => {
        if (state) {
            setOpenModal(true);
        }
    }, [state]);

    function handleUpdateModal(idx) {
        setGameIdx(idx);
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
            name: 'GAME_NAME',
            label: 'GAME NAME',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'GAME_URL',
            label: 'URL',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => (
                    <Typography>
                        <a href={value} target="_blank">
                            Visit Link
                        </a>
                    </Typography>
                )
            }
        },
        {
            name: 'DESCRIPTION',
            label: 'DESCRIPTION',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) =>
                    value === null ? (
                        <Typography style={{ color: 'gray', fontStyle: 'italic' }}>Description not available</Typography>
                    ) : (
                        <Typography>{value}</Typography>
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
                                    dispatch(setDataIndex(dataIndex));
                                    setPlayerId(players.data[dataIndex].PLAYER_ID);
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
        // count: players.totalRecords,
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
        dispatch(getPlayers({ pageno: pageNo, limit: pageLmit }));
    }, []);

    return (
        <Box>
            <Paper>
                <MainCard
                    title={!isMobileDevice && 'Players List'}
                    secondary={
                        <Button
                            id="add-player-btn"
                            startIcon={<AddIcon />}
                            onClick={() => setOpenModal(!openModal)}
                            variant="contained"
                            color="secondary"
                        >
                            Add Player
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
                                Add Player
                            </Button>
                            <Divider />
                        </>
                    )}
                    <Box>
                        {playersList.length > 0 ? (
                            <DataTable title="Players List" data={players.data} columns={columns} options={options} />
                        ) : (
                            <NotFoundCard msg="Sorry, No data found" />
                        )}
                    </Box>
                </MainCard>
            </Paper>

            {/* {players.status === 'failed' && <AlertComponent status="false" message={players.msg} />}
            {players.status === 'success' && <AlertComponent status="true" message={players.msg} />} */}

            <Modal title="Add New Player" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <NewPlayerForm formik={formik} open={openModal} onClose={() => setOpenModal(!openModal)} />
            </Modal>
        </Box>
    );
}

export default Players;
