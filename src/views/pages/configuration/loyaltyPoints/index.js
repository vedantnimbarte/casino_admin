import { useState } from 'react';
import { Tooltip, Box, Button, TextField, Typography, useTheme, useMediaQuery, Divider } from '@mui/material';
import { IconCirclePlus as AddIcon, IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { Formik, Form } from 'formik';

// Components
import DataTable from 'components/DataTable';
import ModalComponent from 'components/ResponsiveModal';
import MainCard from '../../../../ui-component/cards/MainCard';
import NotFoundCard from 'components/NotFoundCard';
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
                            Add Loyalty Level
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
                            Add Loyalty Level
                        </Button>
                        <Divider />
                    </>
                )}
                <Box>
                    {data.length > 0 ? (
                        <DataTable title="Loyalty Levels List" data={data} columns={columns} options={options} />
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>

            <ModalComponent title="Add New Loyalty Level" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Formik
                        initialValues={{ level: '', pointsNeeded: '', multiplier: '' }}
                        enableReinitialize
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
                                    fullWidth
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    label="Multiplier"
                                    error={formik.touched.multiplier && Boolean(formik.errors.multiplier)}
                                    helperText={formik.touched.multiplier && formik.errors.multiplier}
                                />

                                {formik.values.multiplier && (
                                    <Box
                                        style={{
                                            marginTop: 10,
                                            textAlign: 'center',
                                            marginBottom: 10,
                                            border: '1px solid gray',
                                            borderRadius: 10,
                                            padding: 10
                                        }}
                                        fullWidth
                                    >
                                        <Typography sx={{ color: theme.palette.primary.dark, fontWeight: 'bold' }}>
                                            * CALCULATIONS AS PER ENTERED DATA *
                                        </Typography>
                                        <Divider />
                                        <Box style={{ margin: 10 }}>
                                            <Typography>
                                                Loyalty Points: {formik.values.multiplier ? formik.values.multiplier : 0} /1$
                                            </Typography>
                                            <Typography color="error">
                                                If player wagered $1000 then he will get {1000 * formik.values.multiplier} loyalty points
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}

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
