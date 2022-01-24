import { Box, Button, MenuItem, OutlinedInput, FormHelperText, InputLabel, FormControl, Select, TextField } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import gameSchema from 'schema/game.schema';
import { createGames } from 'store/thunk/cms/games.thunk';

function CreateGames({ dispatch, isMobileDevice, openModal, setOpenModal, theme }) {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validationSchema: gameSchema,
        onSubmit: (values) => {
            dispatch(createGames(values));
            setOpenModal(!openModal);
        }
    });

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <FormControl
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                >
                    <InputLabel htmlFor="name">Game Name</InputLabel>
                    <OutlinedInput
                        variant="outlined"
                        label="Game Name"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.name && formik.errors.name && <FormHelperText>{formik.errors.name}</FormHelperText>}
                </FormControl>
                <InputLabel>Game Image *</InputLabel>
                <TextField
                    type="file"
                    variant="outlined"
                    fullWidth
                    name="image"
                    style={{ marginTop: 10, marginBottom: 10 }}
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.image && Boolean(formik.errors.image)}
                    helperText={formik.touched.image && formik.errors.image}
                    required
                />
                <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }} error={formik.touched.url && Boolean(formik.errors.url)}>
                    <InputLabel htmlFor="url">Game URL</InputLabel>
                    <OutlinedInput
                        variant="outlined"
                        label="Game URL"
                        id="url"
                        name="url"
                        value={formik.values.url}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.url && formik.errors.url && <FormHelperText id="url-error">{formik.errors.url}</FormHelperText>}
                </FormControl>

                <FormControl fullWidth error={formik.touched.group && Boolean(formik.errors.group)}>
                    <InputLabel htmlFor="group">Select Game Type</InputLabel>
                    <Select
                        value={formik.values.group}
                        id="group"
                        name="group"
                        label="Select Game Type"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    >
                        <MenuItem value="">Select game type</MenuItem>
                        <MenuItem value="FISH">Fish</MenuItem>
                        <MenuItem value="BOARD">Board</MenuItem>
                        <MenuItem value="CARD">Card</MenuItem>
                    </Select>
                    {formik.touched.group && formik.errors.group && <FormHelperText id="group-error">{formik.errors.group}</FormHelperText>}
                </FormControl>
                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                >
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <OutlinedInput
                        variant="outlined"
                        label="Description"
                        id="description"
                        name="description"
                        multiline
                        rows={5}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <FormHelperText id="description-error">{formik.errors.description}</FormHelperText>
                    )}
                </FormControl>
                <Box style={{ display: 'flex', justifyContent: 'right', float: 'right' }}>
                    <Button
                        type="cancel"
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

export default CreateGames;
