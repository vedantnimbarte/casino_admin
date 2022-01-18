import { useState } from 'react';
import {
    Tooltip,
    Box,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
    Divider,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput
} from '@mui/material';
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
                    <Tooltip title="Add New Loyalty Level">
                        <Button
                            startIcon={<AddIcon />}
                            onClick={() => setOpenModal(!openModal)}
                            variant="contained"
                            color="secondary"
                            id="add-new-loyalty-level"
                        >
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
                                <FormControl fullWidth error={formik.touched.level && Boolean(formik.errors.level)}>
                                    <InputLabel htmlFor="level">Level</InputLabel>
                                    <OutlinedInput
                                        value={formik.values.level}
                                        id="level"
                                        type="text"
                                        label="Level"
                                        name="level"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        variant="outlined"
                                        required
                                    />
                                    {formik.touched.level && formik.errors.level && (
                                        <FormHelperText error id="level-error">
                                            {formik.errors.level}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    error={formik.touched.pointsNeeded && Boolean(formik.errors.pointsNeeded)}
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                >
                                    <InputLabel htmlFor="points-needed">Points Needed</InputLabel>
                                    <OutlinedInput
                                        value={formik.values.pointsNeeded}
                                        type="text"
                                        id="points-needed"
                                        name="pointsNeeded"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        variant="outlined"
                                        label="Points Needed"
                                    />
                                    {formik.touched.pointsNeeded && formik.errors.pointsNeeded && (
                                        <FormHelperText error id="pointsNeeded-error">
                                            {formik.errors.pointsNeeded}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl fullWidth error={formik.touched.multiplier && Boolean(formik.errors.multiplier)}>
                                    <InputLabel htmlFor="multiplier">Multiplier</InputLabel>
                                    <OutlinedInput
                                        value={formik.values.multiplier}
                                        type="text"
                                        id="multiplier"
                                        name="multiplier"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        variant="outlined"
                                        label="Multiplier"
                                    />
                                    {formik.touched.multiplier && formik.errors.multiplier && (
                                        <FormHelperText error id="multiplier-error">
                                            {formik.errors.multiplier}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                {formik.values.multiplier && (
                                    <Box
                                        className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-wb57ya-MuiFormControl-root-MuiTextField-root"
                                        sx={{
                                            marginTop: 2,
                                            padding: 2,
                                            border: '1px solid black',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography
                                            style={{ color: theme.palette.primary.dark, fontWeight: 'bold' }}
                                            id="calculations-title"
                                        >
                                            * CALCULATIONS AS PER ENTERED DATA *
                                        </Typography>
                                        <Typography>
                                            Loyalty Points: {formik.values.multiplier ? formik.values.multiplier : 0} /1$
                                        </Typography>
                                        <Typography color="error">
                                            If player wagered ${formik.values.pointsNeeded} then he will get{' '}
                                            {Math.round(formik.values.pointsNeeded * formik.values.multiplier)} loyalty points
                                        </Typography>
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
                                        disabled={!(formik.isValid && formik.dirty)}
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
