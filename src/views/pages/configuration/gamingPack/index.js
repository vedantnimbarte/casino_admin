import { useState } from 'react';
import { Box, Button, Grid, useTheme, useMediaQuery } from '@mui/material';
import { IconCirclePlus as AddIcon } from '@tabler/icons';

import { useSelector, useDispatch } from 'react-redux';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import Modal from 'components/ResponsiveModal';
import CommissionCard from './components/Cards/CommissionCard';
import CreateGamePack from './components/Forms/CreateGamePack';
import UpdateGamePack from './components/Forms/UpdateGamePack';
import NotFoundCard from 'components/NotFoundCard';

function GamingPack() {
    const dispatch = useDispatch();
    const gamePack = useSelector((state) => state.gamePack);
    const [openModal, setOpenModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box>
            <MainCard
                title="Game Packs"
                secondary={
                    <Button
                        startIcon={<AddIcon />}
                        variant="contained"
                        color="primary"
                        sx={{ mx: 3 }}
                        onClick={() => setOpenModal(!openModal)}
                        id="add-game-pack"
                    >
                        Add Game Pack
                    </Button>
                }
            >
                <Box>
                    {gamePack.data.length > 0 ? (
                        <Grid container spacing={4}>
                            <Grid item lg={3} md={3} sm={6} xs={12}>
                                <CommissionCard isOffer handleEdit={setUpdateModal} />
                            </Grid>
                        </Grid>
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>

            <Modal title="Add New Game Pack" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <CreateGamePack
                    dispatch={dispatch}
                    isMobileDevice={isMobileDevice}
                    updateModal={updateModal}
                    setUpdateModal={setUpdateModal}
                    theme={theme}
                />
            </Modal>

            <Modal title="Update Game Pack" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                <UpdateGamePack
                    dispatch={dispatch}
                    isMobileDevice={isMobileDevice}
                    updateModal={updateModal}
                    setUpdateModal={setUpdateModal}
                    theme={theme}
                />
            </Modal>
        </Box>
    );
}

export default GamingPack;
