import React, { useState } from 'react';
import { IconButton, Tooltip, Box, TextField } from '@mui/material';
import { IconCirclePlus as AddIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import gameGroupSchema from 'schema/gameGroup.schema';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';
import FullScreenDialog from 'components/FullScreenDialog';

function GameGroup() {
    const [openModal, setOpenModal] = useState(false);

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

    const data = [
        {
            ID: 1,
            Group: 'Fish'
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
                title="Game Types"
                secondary={
                    <Tooltip title="Add New Type">
                        <IconButton onClick={() => setOpenModal(!openModal)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
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

            <FullScreenDialog title="Add New Game Type" dialogStatus={openModal} setDialogStatus={setOpenModal} formik={formik}>
                <Box style={{ padding: 30 }}>
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
                </Box>
            </FullScreenDialog>
        </Box>
    );
}

export default GameGroup;
