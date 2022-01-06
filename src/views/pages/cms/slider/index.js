import { useState } from 'react';
import { Tooltip, Box, Button, TextField, FormControl, useTheme, useMediaQuery, Divider } from '@mui/material';
import { IconCirclePlus as AddIcon, IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { Formik, Form } from 'formik';

// Components
import DataTable from 'components/DataTable';
import ModalComponent from 'components/ResponsiveModal';
import MainCard from '../../../../ui-component/cards/MainCard';
import NotFoundCard from 'components/NotFoundCard';
import sliderSchema from 'schema/slider.schema';

function Slider() {
    const [openModal, setOpenModal] = useState(false);
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

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
                title={!isMobileDevice && 'Slider'}
                secondary={
                    <Tooltip title="Add New Slider">
                        <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
                            Add Slider
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
                            Add Slider
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
                                <TextField
                                    value={formik.values.image}
                                    type="text"
                                    name="image"
                                    multiline
                                    rows={5}
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    fullWidth
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    label="Description"
                                    error={formik.touched.image && Boolean(formik.errors.image)}
                                    helperText={formik.touched.image && formik.errors.image}
                                />

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
                                    >
                                        Submit
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
