import { Box, Button, MenuItem, OutlinedInput, FormHelperText, InputLabel, FormControl, Select, TextField } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { updateGameSchema } from 'schema/game.schema';
import { updateGames } from 'store/thunk/cms/games.thunk';
import { getGameType } from 'store/thunk/configuration/gameType.thunk';

function UpdateGames({ dispatch, openModal, setOpenModal, theme, games, gamesIndex, isMobileDevice, gameType }) {
    const formik = useFormik({
        initialValues: {
            name: games.data[gamesIndex].GAME_NAME || '',
            description: games.data[gamesIndex].DESCRIPTION || '',
            group: games.data[gamesIndex].GAMEGROUP_ID || '',
            url: games.data[gamesIndex].GAME_URL || '',
            id: games.data[gamesIndex].GAME_ID
        },
        validationSchema: updateGameSchema,
        onSubmit: (values) => {
            if (!values.fileupload) {
                const data = {};
                Object.assign(data, { GAME_NAME: values.name });
                Object.assign(data, { GAMEGROUP_ID: values.group });
                Object.assign(data, { GAME_URL: values.url });
                Object.assign(data, { DESCRIPTION: values.description });

                dispatch(updateGames({ data, id: values.id, isFile: false }));
            } else {
                const data = new FormData();
                data.append('GAME_NAME', values.name);
                data.append('GAMEGROUP_ID', values.group);
                data.append('GAME_URL', values.url);
                data.append('DESCRIPTION', values.description);
                data.append('FILEUPLOAD', values.fileupload, values.fileupload.name);
                data.append('oldImage', games.data[gamesIndex].GAME_IMAGE);

                dispatch(updateGames({ data, id: values.id, isFile: true }));
            }

            setOpenModal(!openModal);
        }
    });
    useEffect(() => {
        dispatch(getGameType({ pageno: 0, limit: 10 }));
    }, []);

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
                    name="fileupload"
                    style={{ marginTop: 10, marginBottom: 10 }}
                    // value={formik.values.fileupload}
                    onChange={(e) => formik.setFieldValue(e.target.name, e.target.files[0])}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fileupload && Boolean(formik.errors.fileupload)}
                    helperText={formik.touched.fileupload && formik.errors.fileupload}
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
                        {gameType.data.length > 0 ? (
                            gameType.data?.map((value) => <MenuItem value={value.GAMEGROUP_ID}>{value.GAMEGROUP_NAME}</MenuItem>)
                        ) : (
                            <MenuItem disabled>No Game Types Available</MenuItem>
                        )}
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

export default UpdateGames;
