import { Box, Button, Select, MenuItem, OutlinedInput, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import menuSchema from 'schema/menu.schema';
import { updateMenu } from 'store/thunk/configuration/menu.thunk';

function UpdateMenu({ menu, dispatch, isMobileDevice, openModal, setOpenModal, theme, permissionIdx }) {
    const formik = useFormik({
        initialValues: {
            name: menu.data[permissionIdx].MENU_NAME || '',
            slug: menu.data[permissionIdx].MENU_SLUG || '',
            id: menu.data[permissionIdx].MENU_ID
        },
        validationSchema: menuSchema,
        onSubmit: (values) => {
            dispatch(updateMenu(values));
            setOpenModal(!openModal);
        }
    });

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <FormControl fullWidth error={formik.touched.name && Boolean(formik.errors.name)} style={{ marginBottom: 10 }}>
                    <InputLabel htmlFor="agent-name">Menu Name</InputLabel>
                    <OutlinedInput
                        value={formik.values.name}
                        type="text"
                        label="Menu Name"
                        name="name"
                        id="menu-name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                    />
                    {formik.touched.name && formik.errors.name && <FormHelperText id="name-error">{formik.errors.name}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={formik.touched.slug && Boolean(formik.errors.slug)} style={{ marginBottom: 10 }}>
                    <InputLabel htmlFor="agent-name">Menu URL</InputLabel>
                    <OutlinedInput
                        value={formik.values.slug}
                        type="text"
                        label="Menu URL"
                        name="slug"
                        id="menu-slug"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                    />
                    {formik.touched.slug && formik.errors.slug && <FormHelperText id="name-error">{formik.errors.slug}</FormHelperText>}
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

export default UpdateMenu;
