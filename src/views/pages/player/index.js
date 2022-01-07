import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Button, Paper, useMediaQuery, useTheme, Divider } from '@mui/material';
import { IconCirclePlus as AddIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import { useLocation } from 'react-router';

import playerSchema from 'schema/player.schema';

// __mock__ data
import playersList from './__mock__/player-list';
import approvalList from './__mock__/approval-list';

// Components
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';
import Modal from 'components/ResponsiveModal';

import NewPlayerForm from './components/Forms/NewPlayer';
import TabPanel from './components/TabPanel';

function Players() {
    const [openModal, setOpenModal] = useState(false);
    const { state } = useLocation();
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const formik = useFormik({
        initialValues: { username: '', name: '', email: '', password: '', confirm_password: '', phone_no: '', agent: '' },
        validationSchema: playerSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    useEffect(() => {
        if (state) {
            setOpenModal(!openModal);
        }
    }, [state]);

    const columns = ['ID', 'username', 'name', 'email', 'phone_no', 'agent', 'status'];

    const options = {
        filter: false,
        print: false,
        download: false,
        selectableRows: false,
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 20],
        jumpToPage: true,
        elevation: 2
    };

    return (
        <Box>
            <Paper>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="basic tabs example"
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab label="Player List" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <MainCard
                        title={!isMobileDevice && 'Players List'}
                        secondary={
                            <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
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
                                <DataTable title="Players List" data={playersList} columns={columns} options={options} />
                            ) : (
                                <NotFoundCard msg="Sorry, No data found" />
                            )}
                        </Box>
                    </MainCard>
                </TabPanel>
            </Paper>

            <Modal title="Add New Player" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <NewPlayerForm formik={formik} open={openModal} onClose={() => setOpenModal(!openModal)} />
            </Modal>
        </Box>
    );
}

export default Players;
