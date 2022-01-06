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
import loyaltyPointsSchema from 'schema/loyaltyPoints.schema';

function LoyaltyPoints() {
    const [openModal, setOpenModal] = useState(false);
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const columns = ['ID', 'Level', 'Points_Needed', 'Multiplier', 'Waging_Value'];

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
                title={!isMobileDevice && 'Loyalty Points'}
                secondary={
                    <Tooltip title="Add New Slider">
                        <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
                            Add Loyalty Points
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
                            Add Loyalty Points
                        </Button>
                        <Divider />
                    </>
                )}
                <Box>
                    {data.length > 0 ? (
                        <DataTable title="Loyalty Points List" data={data} columns={columns} options={options} />
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>

            <ModalComponent title="Add New Loyalty Point" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Formik
                        initialValues={{ level: '', pointsNeeded: '', multiplier: '', wageringValue: '' }}
                        validationSchema={loyaltyPointsSchema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {(formik) => (
                            <Form noValidate onSubmit={formik.handleSubmit}>
                                <TextField
                                    value={formik.values.level}
                                    type="text"
                                    label="Level"
                                    name="level"
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    fullWidth
                                    error={formik.touched.level && Boolean(formik.errors.level)}
                                    helperText={formik.touched.level && formik.errors.level}
                                    required
                                />
                                <TextField
                                    value={formik.values.pointsNeeded}
                                    type="text"
                                    name="pointsNeeded"
                                    rows={5}
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    fullWidth
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    label="Points Needed"
                                    error={formik.touched.pointsNeeded && Boolean(formik.errors.pointsNeeded)}
                                    helperText={formik.touched.pointsNeeded && formik.errors.pointsNeeded}
                                />
                                <TextField
                                    value={formik.values.multiplier}
                                    type="text"
                                    name="multiplier"
                                    rows={5}
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    fullWidth
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    label="Multiplier"
                                    error={formik.touched.multiplier && Boolean(formik.errors.multiplier)}
                                    helperText={formik.touched.multiplier && formik.errors.multiplier}
                                />
                                <TextField
                                    value={formik.values.wageringValue}
                                    type="text"
                                    name="wageringValue"
                                    rows={5}
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    fullWidth
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    label="Wagering Value"
                                    error={formik.touched.wageringValue && Boolean(formik.errors.wageringValue)}
                                    helperText={formik.touched.wageringValue && formik.errors.wageringValue}
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

export default LoyaltyPoints;
