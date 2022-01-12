import { Box, Button, TextField, MenuItem } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import { updateAgentType, getAgentType } from 'store/thunk/configuration/agentType.thunk';

function UpdateAgentType({
    agentType,
    dispatch,
    isMobileDevice,
    openModal,
    setOpenModal,
    theme,
    agentTypeIndex,
    roleSchema,
    pageNo,
    pageLmit
}) {
    const formik = useFormik({
        initialValues: {
            name: agentType.data[agentTypeIndex].ROLE_NAME || '',
            description: agentType.data[agentTypeIndex].DESCRIPTION || '',
            parentRole: agentType.data[agentTypeIndex].MASTER_ROLE_ID || '',
            id: agentType.data[agentTypeIndex].ROLE_ID
        },
        validationSchema: roleSchema,
        onSubmit: (values) => {
            dispatch(updateAgentType(values));
            dispatch(getAgentType({ pageno: pageNo, limit: pageLmit }));
            setOpenModal(!openModal);
        }
    });
    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <TextField
                    value={formik.values.name}
                    type="text"
                    label="Agent Type Name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    style={{ marginBottom: 10 }}
                    fullWidth
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                {agentType.data.length > 0 && (
                    <TextField
                        value={formik.values.parentRole}
                        select
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Select Master Agent Type"
                        name="parentRole"
                        fullWidth
                        style={{ marginBottom: 10 }}
                        error={formik.touched.parentRole && Boolean(formik.errors.parentRole)}
                        helperText={formik.touched.parentRole && formik.errors.parentRole}
                    >
                        <MenuItem value={agentType.data[agentTypeIndex].MASTER_ROLE_ID}>
                            {agentType.data[agentTypeIndex].MASTER_ROLE_NAME}
                        </MenuItem>
                        {agentType.data?.map((parentAgentType) => (
                            <MenuItem
                                value={parentAgentType.ROLE_ID.toString().concat(',', parentAgentType.MASTER_ROLE_ID)}
                                onChange={formik.handleChange}
                            >
                                {parentAgentType.ROLE_NAME}
                            </MenuItem>
                        ))}
                    </TextField>
                )}

                <TextField
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
            </form>
        </Box>
    );
}

export default UpdateAgentType;
