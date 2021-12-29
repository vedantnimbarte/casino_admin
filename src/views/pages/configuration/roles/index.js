import { useState } from 'react';
import { IconButton, Tooltip, Box, Button, TextField, MenuItem } from '@mui/material';
// import DataTable from 'mui-datatables';
import { IconCirclePlus as AddIcon } from '@tabler/icons';
import { Formik, Form } from 'formik';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';
import NotFoundCard from 'components/NotFoundCard';

import roleSchema from 'schema/role.schema';

function Roles() {
    const [openModal, setOpenModal] = useState(false);

    const columns = ['ID', 'Role', 'Action'];

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
                title="Roles"
                secondary={
                    <Tooltip title="Add New Role">
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

            <Modal title="Add New Role" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Formik
                        initialValues={{ name: '', description: '', parentRole: '' }}
                        validationSchema={roleSchema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {(formik) => (
                            <Form noValidate onSubmit={formik.handleSubmit}>
                                {console.log(formik.errors)}
                                <TextField
                                    value={formik.values.role}
                                    type="text"
                                    label="Role Name"
                                    name="name"
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    style={{ margin: 10 }}
                                    fullWidth
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    value={formik.values.parentRole}
                                    select
                                    onChange={formik.handleChange}
                                    label="Select Parent Role"
                                    name="parentRole"
                                    style={{ margin: 10 }}
                                    fullWidth
                                    error={formik.touched.parentRole && Boolean(formik.errors.parentRole)}
                                    helperText={formik.touched.parentRole && formik.errors.parentRole}
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="MasterDistributor">Master Distributor</MenuItem>
                                    <MenuItem value="Distributor">Distributor</MenuItem>
                                    <MenuItem value="SubDistributor">Sub Distributor</MenuItem>
                                    <MenuItem value="Cashior">Cashior</MenuItem>
                                    <MenuItem value="Store">Store</MenuItem>
                                </TextField>

                                <TextField
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    type="text"
                                    multiline
                                    rows={4}
                                    name="description"
                                    variant="outlined"
                                    label="Role Description"
                                    style={{ margin: 10 }}
                                    fullWidth
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />
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

export default Roles;
