import { Box, Button, MenuItem, OutlinedInput, FormHelperText, InputLabel, FormControl, Select } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { createGameType } from 'store/thunk/configuration/gameType.thunk';

function CreateGameType({ dispatch, isMobileDevice, openModal, setOpenModal, theme, gameGroupSchema }) {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validationSchema: gameGroupSchema,
        onSubmit: (values) => {
            dispatch(createGameType(values));
            setOpenModal(!openModal);
        }
    });

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <FormControl fullWidth style={{ marginTop: 10 }} error={formik.touched.name && Boolean(formik.errors.name)}>
                    <InputLabel htmlFor="name">Game Type Name</InputLabel>
                    <OutlinedInput
                        value={formik.values.name}
                        type="text"
                        id="name"
                        name="name"
                        label="Game Type Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        helperText={formik.touched.name && formik.errors.name}
                        required
                    />
                    {formik.touched.name && formik.errors.name && <FormHelperText id="name-error">{formik.errors.name}</FormHelperText>}
                </FormControl>
                <FormControl
                    fullWidth
                    style={{ marginTop: 15, marginBottom: 10 }}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                >
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <OutlinedInput
                        value={formik.values.description}
                        multiline
                        rows={10}
                        type="text"
                        id="description"
                        name="description"
                        label="Description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
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

export default CreateGameType;
