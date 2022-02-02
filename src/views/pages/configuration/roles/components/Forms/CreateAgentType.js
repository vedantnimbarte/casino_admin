import { Box, Button, MenuItem, OutlinedInput, FormHelperText, InputLabel, FormControl, Select } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { createAgentType, getAgentTypesList } from 'store/thunk/configuration/agentType.thunk';

function CreateAgentType({ agentType, dispatch, isMobileDevice, openModal, setOpenModal, theme, roleSchema }) {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            parentRole: ''
        },
        validationSchema: roleSchema,
        onSubmit: (values) => {
            dispatch(createAgentType(values));
            setOpenModal(!openModal);
        }
    });

    useEffect(() => {
        dispatch(getAgentTypesList());
    }, []);

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <FormControl fullWidth error={formik.touched.name && Boolean(formik.errors.name)} style={{ marginBottom: 10 }}>
                    <InputLabel htmlFor="agent-name">Agent Type Name</InputLabel>
                    <OutlinedInput
                        value={formik.values.name}
                        type="text"
                        label="Agent Type Name"
                        name="name"
                        id="agent-name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                    />
                    {formik.touched.name && formik.errors.name && <FormHelperText id="name-error">{formik.errors.name}</FormHelperText>}
                </FormControl>
                {agentType.agentTypesList.length > 0 && (
                    <FormControl
                        fullWidth
                        style={{ marginBottom: 10 }}
                        error={formik.touched.parentRole && Boolean(formik.errors.parentRole)}
                    >
                        <InputLabel htmlFor="agent-parent-role">Select Master Agent Type</InputLabel>
                        <Select
                            value={formik.values.parentRole}
                            onChange={formik.handleChange}
                            label="Select Master Agent Type"
                            name="parentRole"
                            id="agent-parent-role"
                            onBlur={formik.handleBlur}
                        >
                            {agentType.agentTypesList?.map((parentAgentType, index) => (
                                <MenuItem
                                    value={
                                        parentAgentType.ROLE_PARENT_ID == null
                                            ? parentAgentType.ROLE_ID
                                            : parentAgentType.ROLE_ID.toString().concat(',', parentAgentType.ROLE_PARENT_ID)
                                    }
                                    onChange={formik.handleChange}
                                    id={'item' + index}
                                >
                                    {parentAgentType.ROLE_NAME}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.parentRole && formik.errors.parentRole && (
                            <FormHelperText id="parent-role-error">{formik.errors.parentRole}</FormHelperText>
                        )}
                    </FormControl>
                )}

                <FormControl
                    style={{ marginBottom: 10 }}
                    fullWidth
                    error={formik.touched.description && Boolean(formik.errors.description)}
                >
                    <InputLabel htmlFor="description">Agent Type Description</InputLabel>
                    <OutlinedInput
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        multiline
                        rows={4}
                        id="description"
                        name="description"
                        variant="outlined"
                        label="Agent Type Description"
                    />
                    {formik.touched.description && formik.errors.description && (
                        <FormHelperText id="description-error">{formik.errors.description}</FormHelperText>
                    )}
                </FormControl>
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

export default CreateAgentType;
