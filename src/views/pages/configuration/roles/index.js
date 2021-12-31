import { useState } from 'react';
import { Tooltip, Box, Button, TextField, MenuItem, useTheme } from '@mui/material';
import { IconCirclePlus as AddIcon, IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon } from '@tabler/icons';
import { Formik, Form } from 'formik';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';
import NotFoundCard from 'components/NotFoundCard';

import roleSchema from 'schema/role.schema';

function Roles() {
    const [openModal, setOpenModal] = useState(false);
    const theme = useTheme();

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
                title="Agent Type"
                secondary={
                    <Tooltip title="Add New Agent Type">
                        <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
                            Add Agent Type
                        </Button>
                    </Tooltip>
                }
            >
                <Box>
                    {data.length > 0 ? (
                        <DataTable title="Agent Types" data={data} columns={columns} options={options} />
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>

            <Modal title="Add New Agent Type" open={openModal} onClose={() => setOpenModal(!openModal)}>
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
                                    label="Agent Type Name"
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
                                    label="Select Master Agent Type"
                                    name="parentRole"
                                    style={{ margin: 10 }}
                                    fullWidth
                                    error={formik.touched.parentRole && Boolean(formik.errors.parentRole)}
                                    helperText={formik.touched.parentRole && formik.errors.parentRole}
                                >
                                    <MenuItem value="MasterDistributor">Select Master Agent Type</MenuItem>
                                </TextField>

                                <TextField
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    type="text"
                                    multiline
                                    rows={4}
                                    name="description"
                                    variant="outlined"
                                    label="Agent Type Description"
                                    style={{ margin: 10 }}
                                    fullWidth
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
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </Box>
    );
}

export default Roles;
