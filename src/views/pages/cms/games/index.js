import { useState } from 'react';
import { Tooltip, Box, Button, InputLabel, TextField, useTheme, MenuItem, useMediaQuery, Divider } from '@mui/material';
import { IconCirclePlus as AddIcon, IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';
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
                                <TextField
                                    variant="outlined"
                                    label="Game Name"
                                    name="name"
                                    fullWidth
                                    value={formik.values.name}
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    required
                                />
                                <InputLabel>Game Image *</InputLabel>
                                <TextField
                                    type="file"
                                    variant="outlined"
                                    fullWidth
                                    name="image"
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    value={formik.values.image}
                                    onChange={formik.handleChange}
                                    error={formik.touched.image && Boolean(formik.errors.image)}
                                    helperText={formik.touched.image && formik.errors.image}
                                    required
                                />
                                <TextField
                                    variant="outlined"
                                    label="Game URL"
                                    name="url"
                                    fullWidth
                                    value={formik.values.url}
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    onChange={formik.handleChange}
                                    error={formik.touched.url && Boolean(formik.errors.url)}
                                    helperText={formik.touched.url && formik.errors.url}
                                    required
                                />

                                <InputLabel>Select Game Type</InputLabel>
                                <TextField
                                    value={formik.values.group}
                                    select
                                    name="group"
                                    // label="Select Game Type"
                                    onChange={formik.handleChange}
                                    error={formik.touched.group && Boolean(formik.errors.group)}
                                    helperText={formik.touched.group && formik.errors.group}
                                    required
                                    fullWidth
                                >
                                    <MenuItem value="">Select game type</MenuItem>
                                    <MenuItem value="FISH">Fish</MenuItem>
                                    <MenuItem value="BOARD">Board</MenuItem>
                                    <MenuItem value="CARD">Card</MenuItem>
                                </TextField>
                                <TextField
                                    variant="outlined"
                                    label="Description"
                                    name="description"
                                    fullWidth
                                    multiline
                                    rows={5}
                                    value={formik.values.description}
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />
                                <Box style={{ display: 'flex', justifyContent: 'right' }}>
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
