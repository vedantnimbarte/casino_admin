import { useState } from 'react';
import {
    Tooltip,
    Box,
    Button,
    InputLabel,
    OutlinedInput,
    FormControl,
    FormHelperText,
    useTheme,
    MenuItem,
    useMediaQuery,
    Divider,
    TextField,
    Select
} from '@mui/material';
import { IconCirclePlus as AddIcon, IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/ResponsiveModal';
import NotFoundCard from 'components/NotFoundCard';
import { Form, Formik } from 'formik';

// Validation Schema
import gameSchema from 'schema/game.schema';

function Games() {
    const [openModal, setOpenModal] = useState(false);
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const columns = ['id', 'title', 'description', 'Action'];

    const options = {
        filter: false,
        print: false,
        download: false,
        search: false,
        selectableRows: 'none',
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 20]
    };

    const data = [];

    return (
        <Box>
            <MainCard
                title={!isMobileDevice && 'Games'}
                secondary={
                    <Tooltip title="Add New Slider">
                        <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
                            Add Game
                        </Button>
                    </Tooltip>
                }
            >
                {isMobileDevice && (
                    <>
                        <Button
                            startIcon={<AddIcon />}
                            fullWidth
                            style={{ marginBottom: 15 }}
                            onClick={() => setOpenModal(!openModal)}
                            variant="contained"
                            color="secondary"
                        >
                            Add Game
                        </Button>
                        <Divider />
                    </>
                )}
                <Box>
                    {data.length > 0 ? (
                        <DataTable title="Games List" data={data} columns={columns} options={options} />
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>

            <Modal title="Add New Game" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Formik
                        initialValues={{ name: '', image: '', url: '', group: '', description: '' }}
                        validationSchema={gameSchema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {(formik) => (
                            <Form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
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
                                <FormControl
                                    fullWidth
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    error={formik.touched.url && Boolean(formik.errors.url)}
                                >
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
                                    {formik.touched.url && formik.errors.url && (
                                        <FormHelperText id="url-error">{formik.errors.url}</FormHelperText>
                                    )}
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
                                    {formik.touched.group && formik.errors.group && (
                                        <FormHelperText id="group-error">{formik.errors.group}</FormHelperText>
                                    )}
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
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </Box>
    );
}

export default Games;
