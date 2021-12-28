import { useState } from 'react';
import { IconButton, Tooltip, Box, Button, InputLabel, TextField, FormControl } from '@mui/material';
import { IconCirclePlus as AddIcon } from '@tabler/icons';
import { Formik, Form } from 'formik';

// Components
import DataTable from 'components/DataTable';
import ModalComponent from 'components/Modal';
import MainCard from '../../../../ui-component/cards/MainCard';
import NotFoundCard from 'components/NotFoundCard';
import sliderSchema from 'schema/slider.schema';

function Slider() {
    const [openModal, setOpenModal] = useState(false);

    const columns = ['ID', 'Image', 'Action'];

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
                title="Slider"
                secondary={
                    <Tooltip title="Add New Slider">
                        <IconButton onClick={() => setOpenModal(!openModal)}>
                            <AddIcon />
                        </IconButton>
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

            <ModalComponent title="Add New Slider" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Formik
                        initialValues={{ name: '', image: '' }}
                        validationSchema={sliderSchema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {(formik) => (
                            <Form noValidate onSubmit={formik.handleSubmit}>
                                <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
                                    <InputLabel>Slider Name</InputLabel>
                                    <TextField
                                        value={formik.values.name}
                                        type="text"
                                        label="Slider Name"
                                        name="name"
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        fullWidth
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        required
                                    />
                                </FormControl>
                                <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
                                    <TextField
                                        value={formik.values.image}
                                        type="file"
                                        name="image"
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        fullWidth
                                        error={formik.touched.image && Boolean(formik.errors.image)}
                                        helperText={formik.touched.image && formik.errors.image}
                                        required
                                    />
                                </FormControl>

                                <Box style={{ display: 'flex' }}>
                                    <Button
                                        type="submit"
                                        style={{
                                            backgroundColor: '#673AB7',
                                            color: '#fff',
                                            margin: 10,
                                            width: '50%',
                                            alignSelf: 'center'
                                        }}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        type="reset"
                                        onClick={() => setOpenModal(!openModal)}
                                        variant="contained"
                                        color="info"
                                        style={{
                                            margin: 10,
                                            width: '50%'
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </ModalComponent>
        </Box>
    );
}

export default Slider;
