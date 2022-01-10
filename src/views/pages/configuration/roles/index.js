import { useState } from 'react';
import { Tooltip, Box, Button, TextField, MenuItem, useTheme, useMediaQuery, Divider, LinearProgress } from '@mui/material';
import { IconCirclePlus as AddIcon, IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { Formik, Form, useFormik } from 'formik';

// Redux + Thunk functions
import { useSelector, useDispatch } from 'react-redux';
import { createAgentType } from 'store/thunk/configuration/agentType.thunk';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/ResponsiveModal';
import NotFoundCard from 'components/NotFoundCard';
import AlertComponent from 'components/Alert';

// Schema
import roleSchema from 'schema/role.schema';

function Roles() {
    const [openModal, setOpenModal] = useState(false);
    const theme = useTheme();
    const agentType = useSelector((state) => state.agentType);
    const dispatch = useDispatch();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const formik = useFormik({
        initialValues: { name: '', description: '', parentRole: '' },
        validationSchema: { roleSchema },
        onSubmit: (values) => {
            dispatch(createAgentType(values));
        }
    });

    const columns = ['ID', 'Agent Type', 'Parent Type', 'Action'];

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
        <>
            <Box>
                {agentType.status === 'loading' ? (
                    <LinearProgress fullWidth style={{ marginBottom: 5 }} />
                ) : (
                    <Box style={{ marginBottom: 10 }} />
                )}
                <MainCard
                    title={!isMobileDevice && 'Agent Type'}
                    secondary={
                        <Tooltip title="Add New Agent Type">
                            <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
                                Add Agent Type
                            </Button>
                        </Tooltip>
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
                                Add Agent Type
                            </Button>
                            <Divider />
                        </>
                    )}

                    <Box>
                        {agentType.data?.length > 0 ? (
                            <DataTable title="Agent Types" data={agentType.data} columns={columns} options={options} />
                        ) : (
                            <NotFoundCard msg="Sorry, No data found" />
                        )}
                    </Box>
                </MainCard>

                {agentType.status === 'failed' && <AlertComponent status={agentType.error} message={agentType.errorMsg} />}

                <Modal title="Add New Agent Type" open={openModal} onClose={() => setOpenModal(!openModal)}>
                    <Box style={{ display: 'flex', flexDirection: 'column' }}>
                        <Formik
                            initialValues={{ name: '', description: '', parentRole: '' }}
                            validationSchema={roleSchema}
                            onSubmit={(values) => {
                                dispatch(createAgentType(values));
                            }}
                        >
                            {(formik) => (
                                <Form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                                    <TextField
                                        value={formik.values.name}
                                        type="text"
                                        label="Agent Type Name"
                                        name="name"
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        style={{ marginBottom: 10 }}
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
                                        fullWidth
                                        style={{ marginBottom: 10 }}
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
                                        style={{ marginBottom: 10 }}
                                        fullWidth
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                    />
                                    <Box style={{ display: 'flex', justifyContent: 'right', float: 'right' }}>
                                        <Button
                                            type="reset"
                                            onClick={() => setOpenModal(!openModal)}
                                            variant="contained"
                                            color={theme.palette.secondary.light[800]}
                                            style={{
                                                margin: 10,
                                                color: 'white',
                                                paddingLeft: 20,
                                                paddingRight: 20
                                            }}
                                            startIcon={!isMobileDevice && <CancelIcon />}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            type="reset"
                                            color="error"
                                            style={{
                                                color: '#fff',
                                                margin: 10,
                                                paddingLeft: 20,
                                                paddingRight: 20
                                            }}
                                            startIcon={!isMobileDevice && <ResetIcon />}
                                        >
                                            Reset
                                        </Button>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="secondary"
                                            style={{
                                                color: '#fff',
                                                margin: 10,
                                                paddingLeft: 20,
                                                paddingRight: 20
                                            }}
                                            startIcon={!isMobileDevice && <SaveIcon />}
                                            disabled={!(formik.isValid && formik.dirty)}
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
        </>
    );
}

export default Roles;
