import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, useMediaQuery, useTheme, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { IconCirclePlus as AddIcon, IconPencil as UpdateIcon, IconBan as BlockIcon } from '@tabler/icons';
import { useLocation } from 'react-router';
import moment from 'moment';

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
import BlockConfirmation from './components/Dialog/BlockConfirmation';
import UpdatePlayerForm from './components/Forms/UpdatePlayer';

function Players() {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const players = useSelector((state) => state.player);

    const { state } = useLocation();

    const [openModal, setOpenModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [pageLmit, setpageLmit] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [playerId, setPlayerId] = useState();
    const [playerIdx, setPlayerIdx] = useState();

    useEffect(() => {
        if (state) {
            setOpenModal(true);
        }
    }, [state]);

    function handleUpdateModal(idx) {
        setPlayerIdx(idx);
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
            name: 'PLAYER_NAME',
            label: 'PLAYER NAME',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'PLAYER_USERNAME',
            label: 'USERNAME',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'PLAYER_EMAIL',
            label: 'EMAIL',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'PLAYER_PHONE',
            label: 'PHONE NO',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'LOGIN_DATE',
            label: 'LAST LOGIN',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) =>
                    value !== null ? (
                        <Typography>{value}</Typography>
                    ) : (
                        <Typography style={{ fontStyle: 'italic', color: 'gray' }}>Player not logged in yet</Typography>
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
                                <BlockIcon />
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
        <>
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
                            {players.data.length > 0 ? (
                                <DataTable title="Players List" data={players.data} columns={columns} options={options} />
                            ) : (
                                <NotFoundCard msg="Sorry, No data found" />
                            )}
                        </Box>
                    </MainCard>
                </Paper>

                {players.status === 'failed' && <AlertComponent status="false" message={players.msg} />}
                {players.status === 'success' && <AlertComponent status="true" message={players.msg} />}

                <Modal title="Add New Player" open={openModal} onClose={() => setOpenModal(!openModal)}>
                    <NewPlayerForm dispatch={dispatch} open={openModal} onClose={() => setOpenModal(!openModal)} players={players} />
                </Modal>

                <Modal title="Update Player" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                    <UpdatePlayerForm
                        dispatch={dispatch}
                        open={updateModal}
                        onClose={() => setUpdateModal(!updateModal)}
                        players={players}
                        playerIndex={playerIdx}
                    />
                </Modal>
            </Box>
            {/* Delete confirmation dialog */}
            <Box>
                <BlockConfirmation dispatch={dispatch} openDialog={openDialog} setOpenDialog={setOpenDialog} playerId={playerId} />
            </Box>
        </>
    );
}

export default Players;
