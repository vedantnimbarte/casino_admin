import { useEffect, useState } from 'react';
import { Box, Button, Grid, useTheme, useMediaQuery } from '@mui/material';
import { IconCirclePlus as AddIcon } from '@tabler/icons';

import { useSelector, useDispatch } from 'react-redux';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import Modal from 'components/ResponsiveModal';
import PackCard from './components/Cards/PackCard';
import CreateGamePack from './components/Forms/CreateGamePack';
import UpdateGamePack from './components/Forms/UpdateGamePack';
import NotFoundCard from 'components/NotFoundCard';
import { getCoinPack } from 'store/thunk/configuration/coinPack.thunk';
import AlertComponent from 'components/Alert';
import DeleteConfirmation from './components/Dialog/DeleteConfirmation';
import { setDataIndex } from 'store/reducers/configuration/coinPack.reducer';

function GamingPack() {
    const dispatch = useDispatch();
    const coinPack = useSelector((state) => state.coinPack);
    const [openModal, setOpenModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [coinPackId, setCoinPackId] = useState();
    const [dataIdx, setDataIdx] = useState();

    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        dispatch(getCoinPack({ pageno: 0, limit: 10 }));
    }, []);

    const handleUpdateModal = (idx) => {
        setDataIdx(idx);
        dispatch(setDataIndex(idx));
        setUpdateModal(!updateModal);
    };

    const handleDeleteDialog = (id) => {
        setCoinPackId(id);
        setOpenDialog(!openDialog);
    };

    return (
        <>
            <Box>
                <MainCard
                    title="Coin Packs"
                    secondary={
                        <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            color="primary"
                            sx={{ mx: 3 }}
                            onClick={() => setOpenModal(!openModal)}
                            id="add-game-pack"
                        >
                            Add Coin Pack
                        </Button>
                    }
                >
                    <Box>
                        {coinPack.data.length > 0 ? (
                            <Grid container spacing={4}>
                                {coinPack.data?.map((pack_info, index) => (
                                    <Grid item lg={3} md={3} sm={6} xs={12}>
                                        <PackCard
                                            data={pack_info}
                                            dataIndex={index}
                                            handleEdit={handleUpdateModal}
                                            handleDelete={handleDeleteDialog}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <NotFoundCard msg="Sorry, No data found" />
                        )}
                    </Box>
                </MainCard>

                {coinPack.status === 'failed' && <AlertComponent status="false" message={coinPack.msg} />}
                {coinPack.status === 'success' && <AlertComponent status="true" message={coinPack.msg} />}

                <Modal title="Add New Coin Pack" open={openModal} onClose={() => setOpenModal(!openModal)}>
                    <CreateGamePack
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        theme={theme}
                    />
                </Modal>

                <Modal title="Update Coin Pack" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                    <UpdateGamePack
                        coinPack={coinPack}
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={updateModal}
                        setOpenModal={setUpdateModal}
                        theme={theme}
                        dataIndex={dataIdx}
                    />
                </Modal>
            </Box>

            {/* Delete confirmation dialog */}
            <Box>
                <DeleteConfirmation
                    coinPack={coinPack}
                    dispatch={dispatch}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    coinPackId={coinPackId}
                />
            </Box>
        </>
    );
}

export default GamingPack;
