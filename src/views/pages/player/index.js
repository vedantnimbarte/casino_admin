import React, { useState } from 'react';
import { IconButton, Tooltip, Box, TextField, MenuItem, Grid } from '@mui/material';
import { IconCirclePlus as AddIcon } from '@tabler/icons';
import { useFormik } from 'formik';

import playerSchema from 'schema/player.schema';

// Components
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';
import FullScreenDialog from 'components/FullScreenDialog';

function Players() {
    const [openModal, setOpenModal] = useState(false);

    const formik = useFormik({
        initialValues: { username: '', name: '', email: '', password: '', confirm_password: '', phone_no: '', agent: '' },
        validationSchema: playerSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const columns = ['ID', 'username', 'name', 'email', 'phone_no', 'agent'];

    const data = [
        {
            ID: 1,
            username: 'player1',
            name: 'Player 1',
            email: 'player@email.com',
            phone_no: 4444444444,
            agent: 'Distributor'
        },
        {
            ID: 1,
            username: 'player1',
            name: 'Player 1',
            email: 'player@email.com',
            phone_no: 4444444444,
            agent: 'Distributor'
        },
        {
            ID: 1,
            username: 'player1',
            name: 'Player 1',
            email: 'player@email.com',
            phone_no: 4444444444,
            agent: 'Distributor'
        },
        {
            ID: 1,
            username: 'player1',
            name: 'Player 1',
            email: 'player@email.com',
            phone_no: 4444444444,
            agent: 'Distributor'
        },
        {
            ID: 1,
            username: 'player1',
            name: 'Player 1',
            email: 'player@email.com',
            phone_no: 4444444444,
            agent: 'Distributor'
        },
        {
            ID: 1,
            username: 'player1',
            name: 'Player 1',
            email: 'player@email.com',
            phone_no: 4444444444,
            agent: 'Distributor'
        },
        {
            ID: 1,
            username: 'player1',
            name: 'Player 1',
            email: 'player@email.com',
            phone_no: 4444444444,
            agent: 'Distributor'
        },
        {
            ID: 1,
            username: 'player1',
            name: 'Player 1',
            email: 'player@email.com',
            phone_no: 4444444444,
            agent: 'Distributor'
        }
    ];

    const options = {
        filter: false,
        print: false,
        download: false,
        selectableRows: false,
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 20],
        jumpToPage: true
    };

    return (
        <Box>
            <MainCard
                title="Players"
                secondary={
                    <Tooltip title="Add New Player">
                        <IconButton onClick={() => setOpenModal(!openModal)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
                <Box>
                    {data.length > 0 ? (
                        <DataTable title="Players List" data={data} columns={columns} options={options} />
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>

            <FullScreenDialog title="Add New Player" dialogStatus={openModal} setDialogStatus={setOpenModal} formik={formik}>
                <Box style={{ padding: 30 }}>
                    <TextField
                        value={formik.values.name}
                        type="text"
                        name="name"
                        label="Name"
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: 10, marginBottom: 10 }}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        required
                    />
                    <TextField
                        value={formik.values.username}
                        type="text"
                        name="username"
                        label="Username"
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: 10, marginBottom: 10 }}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        required
                    />
                    <TextField
                        value={formik.values.email}
                        type="text"
                        name="email"
                        label="Email"
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: 10, marginBottom: 10 }}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        required
                    />
                    <Grid container>
                        <Grid item xs={12} sm={12} mg={6} lg={6}>
                            <TextField
                                value={formik.values.password}
                                type="password"
                                name="password"
                                label="Password"
                                onChange={formik.handleChange}
                                variant="outlined"
                                fullWidth
                                style={{ marginTop: 10, marginBottom: 10 }}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                required
                            />
                        </Grid>
                        <Grid sx={12} sm={12} md={6} lg={6}>
                            <TextField
                                value={formik.values.confirm_password}
                                type="password"
                                name="confirm_password"
                                label="Confirm Password"
                                onChange={formik.handleChange}
                                variant="outlined"
                                fullWidth
                                style={{ marginTop: 10, marginBottom: 10 }}
                                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                                helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                                required
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        value={formik.values.phone_no}
                        type="text"
                        name="phone_no"
                        label="Phone No"
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: 10, marginBottom: 10 }}
                        error={formik.touched.phone_no && Boolean(formik.errors.phone_no)}
                        helperText={formik.touched.phone_no && formik.errors.phone_no}
                        required
                    />
                    <TextField
                        value={formik.values.agent}
                        select
                        name="agent"
                        label="Select Agent"
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: 10, marginBottom: 10 }}
                        error={formik.touched.agent && Boolean(formik.errors.agent)}
                        helperText={formik.touched.agent && formik.errors.agent}
                        required
                    >
                        <MenuItem value="master_distributor">Master Distributor</MenuItem>
                        <MenuItem value="distributor">Distributor</MenuItem>
                        <MenuItem value="sub_distributor">Sub Distributor</MenuItem>
                        <MenuItem value="store">Store</MenuItem>
                    </TextField>
                </Box>
            </FullScreenDialog>
        </Box>
    );
}

export default Players;
