import { useState, useEffect } from 'react';
import { Tooltip, Box, Button, useTheme, useMediaQuery, Divider, Typography, IconButton, Paper, Avatar } from '@mui/material';
import { IconCirclePlus as AddIcon, IconPencil as UpdateIcon, IconTrash as DeleteIcon } from '@tabler/icons';
import moment from 'moment';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from 'store/thunk/cms/games.thunk';
import { setDataIndex } from 'store/reducers/cms/games.reducer';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/ResponsiveModal';
import NotFoundCard from 'components/NotFoundCard';
import DeleteConfirmation from './components/Dialog/DeleteConfirmation';
import CreateGames from './components/Forms/CreateGames';
import UpdateGames from './components/Forms/UpdateGames';
import AlertComponent from 'components/Alert';
import { API_URL, IMAGE_URL } from 'common/constants';

function Games() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const games = useSelector((state) => state.games);
    const gameType = useSelector((state) => state.gameType);
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const [openModal, setOpenModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [pageLmit, setpageLmit] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [gamesId, setGamesId] = useState();
    const [gameIdx, setGameIdx] = useState();

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
            name: 'GAME_IMAGE',
            label: 'IMAGE',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <Avatar src={IMAGE_URL.concat('/public/', value)} alt="" sx={{ width: 100, height: 100 }} />
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
                                    setGamesId(games.data[dataIndex].GAMEGROUP_ID);
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
        count: games.totalRecords,
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
        dispatch(getGames({ pageno: pageNo, limit: pageLmit }));
    }, []);

    return (
        <>
            <Box>
                <MainCard
                    title={!isMobileDevice && 'Games'}
                    secondary={
                        <Tooltip title="Add New Slider">
                            <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
                                Add Game
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
                                Add Game
                            </Button>
                            <Divider />
                        </>
                    )}
                    <Box>
                        {games.data.length > 0 ? (
                            <DataTable title="Games List" data={games.data} columns={columns} options={options} />
                        ) : (
                            <NotFoundCard msg="Sorry, No data found" />
                        )}
                    </Box>
                </MainCard>

                {games.status === 'failed' && <AlertComponent status="false" message={games.msg} />}
                {games.status === 'success' && <AlertComponent status="true" message={games.msg} />}

                <Modal title="Add New Game" open={openModal} onClose={() => setOpenModal(!openModal)}>
                    <CreateGames dispatch={dispatch} openModal={openModal} setOpenModal={setOpenModal} theme={theme} gameType={gameType} />
                </Modal>

                <Modal title="Update Game" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                    <UpdateGames
                        dispatch={dispatch}
                        openModal={updateModal}
                        setOpenModal={setUpdateModal}
                        theme={theme}
                        games={games}
                        gamesIndex={gameIdx}
                        isMobileDevice={isMobileDevice}
                        gameType={gameType}
                    />
                </Modal>
            </Box>

            {/* Delete confirmation dialog */}
            <Box>
                <DeleteConfirmation dispatch={dispatch} openDialog={openDialog} setOpenDialog={setOpenDialog} gamesId={gamesId} />
            </Box>
        </>
    );
}

export default Games;
