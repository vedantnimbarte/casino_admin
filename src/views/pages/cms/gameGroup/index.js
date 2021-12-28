import { useState } from 'react';
import { IconButton, Tooltip, Box, Button, InputLabel, TextField, FormControl } from '@mui/material';
import { IconCirclePlus as AddIcon } from '@tabler/icons';
import { Form, Formik } from 'formik';
import gameGroupSchema from 'schema/gameGroup.schema';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';
import NotFoundCard from 'components/NotFoundCard';

function GameGroup() {
    const [openModal, setOpenModal] = useState(false);

    const columns = ['ID', 'Name', 'Action'];

    const data = [];

    const options = {
        filter: false,
        print: false,
        download: false,
        search: false,
        selectableRows: false,
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 20]
    };

    return (
        <Box>
            <MainCard
                title="Game Groups"
                secondary={
                    <Tooltip title="Add New Group">
                        <IconButton onClick={() => setOpenModal(!openModal)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
                <Box>
                    {data.length > 0 ? (
                        <DataTable title="Games List" data={data} columns={columns} options={options} />
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>

            <Modal title="Add New Game Group" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Formik
                        initialValues={{ name: '', description: '' }}
                        validationSchema={gameGroupSchema}
                        onSubmit={(values) => console.log(values)}
                    >
                        {(formik) => (
                            <Form noValidate onSubmit={formik.handleSubmit}>
                                <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
                                    <InputLabel>Game Group Name</InputLabel>
                                    <TextField
                                        value={formik.values.name}
                                        type="text"
                                        name="name"
                                        label="Game Group Name"
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        required
                                    />
                                </FormControl>
                                <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
                                    <InputLabel>Description</InputLabel>
                                    <TextField
                                        value={formik.values.description}
                                        type="text"
                                        name="description"
                                        label="Description"
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                    />
                                </FormControl>
                                <Box style={{ display: 'flex' }}>
                                    <Button
                                        type="submit"
                                        style={{
                                            backgroundColor: '#673AB7',
                                            color: '#fff',
                                            margin: 10,
                                            width: '50%',
                                            alignSelf: 'center'
                                        }}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        style={{
                                            margin: 10,
                                            width: '50%'
                                        }}
                                        onClick={() => setOpenModal(!openModal)}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </Box>
    );
}

export default GameGroup;
