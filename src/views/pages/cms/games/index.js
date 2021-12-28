import { useState, useEffect } from 'react';
import { IconButton, Tooltip, Box, Button, InputLabel, TextField, CircularProgress, Select, MenuItem, FormControl } from '@mui/material';
import { IconCirclePlus as AddIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';
import NotFoundCard from 'components/NotFoundCard';
import { Form, Formik, useFormik } from 'formik';

// Validation Schema
import gameSchema from 'schema/game.schema';

function Games() {
    const [openModal, setOpenModal] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState(null);

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

    async function getGamesData() {
        setLoading(true);
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (response.status === 200) {
                const result = await response.json();
                if (result) {
                    setData(result);
                }
            } else if (response.status === 403) {
                setError(new Error("You don't have enough permission to view this data"));
            }
        } catch (err) {
            setError(new Error(err.message));
        }
        setLoading(false);
    }

    useEffect(() => {
        getGamesData();
        return () => {
            setData(null);
            setError('');
            setLoading(true);
        };
    }, []);

    return (
        <Box>
            <MainCard
                title="Games"
                secondary={
                    <Tooltip title="Add New Game">
                        <IconButton onClick={() => setOpenModal(!openModal)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
                <Box>
                    {loading && <CircularProgress />}
                    {!loading && data ? (
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
                            console.log('submitting');
                            console.log(values);
                        }}
                    >
                        {(formik) => (
                            <Form noValidate onSubmit={formik.handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    label="Game Name"
                                    name="name"
                                    fullWidth
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    required
                                />
                                <InputLabel>Game Image</InputLabel>
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
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    onChange={formik.handleChange}
                                    error={formik.touched.url && Boolean(formik.errors.url)}
                                    helperText={formik.touched.url && formik.errors.url}
                                    required
                                />

                                <TextField
                                    value={formik.values.group}
                                    select
                                    name="group"
                                    onChange={formik.handleChange}
                                    error={formik.touched.group && Boolean(formik.errors.group)}
                                    helperText={formik.touched.group && formik.errors.group}
                                    required
                                    fullWidth
                                >
                                    <MenuItem value="">Select game group</MenuItem>
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
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />
                                <Button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#673AB7',
                                        color: '#fff',
                                        margin: 10
                                    }}
                                    fullWidth
                                >
                                    Add Game
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </Box>
    );
}

export default Games;
