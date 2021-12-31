import { useState } from 'react';
import { Tooltip, Box, Button, MenuItem, TextField, InputLabel, useTheme } from '@mui/material';
import { IconCirclePlus as AddIcon, IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';

import { Formik, Form } from 'formik';

// Components
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';
import MainCard from '../../../../ui-component/cards/MainCard';
import NotFoundCard from 'components/NotFoundCard';

import notificationSchema from 'schema/notification.schema';

function Notification() {
    const [openModal, setOpenModal] = useState(false);

    const theme = useTheme();

    const columns = ['ID', 'Format', 'Title', 'Message', 'Image', 'Video URL', 'Action'];

    const data = [];

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
        <Box>
            <MainCard
                title="Notification"
                secondary={
                    <Tooltip title="Add New Slider">
                        <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
                            Add Notification
                        </Button>
                    </Tooltip>
                }
            >
                <Box>
                    {data.length > 0 ? (
                        <DataTable title="Games List" data={data} columns={columns} options={options} />
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>

            <Modal title="Add New Notification" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Formik
                        initialValues={{ type: 'text', title: '', message: '', image: '', url: '' }}
                        validationSchema={notificationSchema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {(formik) => (
                            <Form noValidate onSubmit={formik.handleSubmit}>
                                <InputLabel id="type">Select Notification Type</InputLabel>
                                <TextField
                                    select
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    name="type"
                                    fullWidth
                                    error={formik.touched.type && Boolean(formik.errors.type)}
                                    helperText={formik.touched.type && formik.errors.type}
                                >
                                    <MenuItem value="text">Text</MenuItem>
                                    <MenuItem value="image">Image</MenuItem>
                                    <MenuItem value="video">Video</MenuItem>
                                </TextField>
                                <TextField
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    name="title"
                                    label="Title"
                                    fullWidth
                                    style={{ margin: '10px 0' }}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                />
                                <TextField
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    name="message"
                                    label="Message"
                                    fullWidth
                                    style={{ margin: '10px 0' }}
                                    error={formik.touched.message && Boolean(formik.errors.message)}
                                    helperText={formik.touched.message && formik.errors.message}
                                />
                                {formik.values.type === 'image' && (
                                    <Box style={{ margin: '10px 0' }}>
                                        <InputLabel>Select Image</InputLabel>
                                        <TextField
                                            type="file"
                                            value={formik.values.image}
                                            onChange={formik.handleChange}
                                            variant="outlined"
                                            fullWidth
                                            error={formik.touched.image && Boolean(formik.errors.image)}
                                            helperText={formik.touched.image && formik.errors.image}
                                        />
                                    </Box>
                                )}
                                {formik.values.type === 'video' && (
                                    <TextField
                                        type="url"
                                        value={formik.values.image}
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        label="Video Url"
                                        fullWidth
                                        style={{ margin: '10px 0' }}
                                        error={formik.touched.url && Boolean(formik.errors.url)}
                                        helperText={formik.touched.url && formik.errors.url}
                                    />
                                )}
                                <Box style={{ display: 'flex', justifyContent: 'right' }}>
                                    <Button
                                        type="reset"
                                        onClick={() => setOpenModal(!openModal)}
                                        variant="contained"
                                        color={theme.palette.secondary.light[800]}
                                        style={{
                                            margin: 10,
                                            color: 'white'
                                        }}
                                        startIcon={<CancelIcon />}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        type="reset"
                                        color="error"
                                        style={{
                                            color: '#fff',
                                            margin: 10
                                        }}
                                        startIcon={<ResetIcon />}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="secondary"
                                        style={{
                                            color: '#fff',
                                            margin: 10
                                        }}
                                        startIcon={<SaveIcon />}
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

export default Notification;
