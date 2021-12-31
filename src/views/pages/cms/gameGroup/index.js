import React, { useState } from 'react';
import { Box, TextField, Button, useTheme } from '@mui/material';
import { IconCirclePlus as AddIcon, IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import gameGroupSchema from 'schema/gameGroup.schema';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';
import FullScreenDialog from 'components/FullScreenDialog';
import Modal from 'components/Modal';

function GameGroup() {
    const [openModal, setOpenModal] = useState(false);
    const theme = useTheme();

    const formik = useFormik({
        initialValues: { name: '', description: '' },
        validationSchema: gameGroupSchema,
        onSubmit: (values) => {
            console.log(values);
        },
        onReset: (values) => {
            values = { name: '', description: '' };
        }
    });

    const columns = ['ID', 'Game Type', 'Action'];

    const data = [];

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
                title="Game Types"
                secondary={
                    <Button color="secondary" startIcon={<AddIcon />} variant="contained" onClick={() => setOpenModal(!openModal)}>
                        Add Game Type
                    </Button>
                }
            >
                <Box>
                    {data.length > 0 ? (
                        <DataTable title="Game Types List" data={data} columns={columns} options={options} />
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>

            <Modal title="Add New Game Type" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                        <TextField
                            value={formik.values.name}
                            type="text"
                            name="name"
                            label="Game Type Name"
                            onChange={formik.handleChange}
                            variant="outlined"
                            fullWidth
                            style={{ marginTop: 10, marginBottom: 10 }}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            required
                        />
                        <TextField
                            value={formik.values.description}
                            multiline
                            rows={10}
                            type="text"
                            name="description"
                            label="Description"
                            onChange={formik.handleChange}
                            variant="outlined"
                            fullWidth
                            style={{ marginTop: 10, marginBottom: 10 }}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <Box style={{ display: 'flex', justifyContent: 'right' }}>
                            <Button
                                type="reset"
                                onClick={() => setOpenModal(!openModal)}
                                variant="contained"
                                color={theme.palette.secondary.light[800]}
                                style={{
                                    margin: 10,
                                    color: 'white'
                                }}
                                startIcon={<ResetIcon />}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                color="secondary"
                                style={{
                                    color: '#fff',
                                    margin: 10
                                }}
                                startIcon={<SaveIcon />}
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
}

export default GameGroup;
