import { useState, useEffect } from 'react';
import { Box, Button, useTheme, useMediaQuery, Divider, Tooltip, IconButton, Typography } from '@mui/material';
import { IconCirclePlus as AddIcon, IconPencil as UpdateIcon, IconTrash as DeleteIcon } from '@tabler/icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import gameGroupSchema from 'schema/gameGroup.schema';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';
import Modal from 'components/ResponsiveModal';
import AlertComponent from 'components/Alert';
import CreateGameType from './components/Forms/CreateGameGroup';
import UpdateGameType from './components/Forms/UpdateGameGroup';

import { createGameType, getGameType } from 'store/thunk/configuration/gameType.thunk';
import { setDataIndex } from 'store/reducers/configuration/gameType.reducer';
import DeleteConfirmation from './components/Dialog/DeleteConfirmation';

function GameGroup() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const gameType = useSelector((state) => state.gameType);

    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const [openModal, setOpenModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [pageLmit, setpageLmit] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [gameGroupId, setGameGroupId] = useState();
    const [gameTypeIdx, setGameTypeIdx] = useState();

    function handleUpdateModal(idx) {
        setGameTypeIdx(idx);
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
            name: 'GAMEGROUP_NAME',
            label: 'AGENT TYPE',
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
                                    setGameGroupId(gameType.data[dataIndex].GAMEGROUP_ID);
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
        count: gameType.totalRecords,
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
        dispatch(getGameType({ pageno: pageNo, limit: pageLmit }));
    }, []);

    return (
        <>
            <Box>
                <MainCard
                    title={!isMobileDevice && 'Game Types'}
                    secondary={
                        <Button color="secondary" startIcon={<AddIcon />} variant="contained" onClick={() => setOpenModal(!openModal)}>
                            Add Game Type
                        </Button>
                    }
                >
                    {isMobileDevice && (
                        <>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={<AddIcon />}
                                variant="contained"
                                onClick={() => setOpenModal(!openModal)}
                                style={{ marginBottom: 15 }}
                            >
                                Add Game Type
                            </Button>
                            <Divider />
                        </>
                    )}
                    <Box>
                        {gameType.data.length > 0 ? (
                            <DataTable title="Game Types List" data={gameType.data} columns={columns} options={options} />
                        ) : (
                            <NotFoundCard msg="Sorry, No data found" />
                        )}
                    </Box>
                </MainCard>

                {gameType.status === 'failed' && <AlertComponent status="false" message={gameType.msg} />}
                {gameType.status === 'success' && <AlertComponent status="true" message={gameType.msg} />}

                <Modal title="Add New Game Type" open={openModal} onClose={() => setOpenModal(!openModal)}>
                    <CreateGameType
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        theme={theme}
                        gameGroupSchema={gameGroupSchema}
                    />
                </Modal>

                <Modal title="Update Game Type" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                    <UpdateGameType
                        gameType={gameType}
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={updateModal}
                        setOpenModal={setUpdateModal}
                        theme={theme}
                        gameTypeIndex={gameTypeIdx}
                        gameGroupSchema={gameGroupSchema}
                    />
                </Modal>
            </Box>

            {/* Delete confirmation dialog */}
            <Box>
                <DeleteConfirmation dispatch={dispatch} openDialog={openDialog} setOpenDialog={setOpenDialog} gameGroupId={gameGroupId} />
            </Box>
        </>
    );
}

export default GameGroup;
