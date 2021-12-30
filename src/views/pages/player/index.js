import React, { useState } from 'react';
import { IconButton, Tooltip, Box, TextField, MenuItem, Grid, Chip, Tabs, Tab, Typography, Card, Paper } from '@mui/material';
import { IconCirclePlus as AddIcon } from '@tabler/icons';
import { useFormik } from 'formik';

import playerSchema from 'schema/player.schema';

// __mock__ data
import playersList from './__mock__/player-list';
import approvalList from './__mock__/approval-list';

// Components
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';
import FullScreenDialog from 'components/FullScreenDialog';

import NewPlayerForm from './components/Forms/NewPlayer';
import TabPanel from './components/TabPanel';

function Players() {
    const [openModal, setOpenModal] = useState(false);

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
                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                    <Tab label="Player List" />
                    <Tab label="Pending Approval" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <MainCard
                        title="Players List"
                        secondary={
                            <Tooltip title="Add New Player">
                                <IconButton onClick={() => setOpenModal(!openModal)} sx={{ m: 0 }}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    >
                        <Box>
                            {playersList.length > 0 ? (
                                <DataTable title="Players List" data={playersList} columns={columns} options={options} />
                            ) : (
                                <NotFoundCard msg="Sorry, No data found" />
                            )}
                        </Box>
                    </MainCard>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MainCard title="Players Approval List">
                        <Box>
                            {approvalList.length > 0 ? (
                                <DataTable title="Players Approval List" data={approvalList} columns={columns} options={options} />
                            ) : (
                                <NotFoundCard msg="Sorry, No data found" />
                            )}
                        </Box>
                    </MainCard>
                </TabPanel>
            </Paper>

            <FullScreenDialog title="Add New Player" dialogStatus={openModal} setDialogStatus={setOpenModal} formik={formik}>
                <NewPlayerForm formik={formik} />
            </FullScreenDialog>
        </Box>
    );
}

export default Players;
