import { Box, Button, Typography, OutlinedInput, FormHelperText, InputLabel, FormControl, Select } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import loyaltyPointsSchema from 'schema/loyaltyPoints.schema';
import { createLoyaltyPack } from 'store/thunk/configuration/loyaltyPack.thunk';

function CreateLoyaltyPack({ dispatch, isMobileDevice, openModal, setOpenModal, theme, loyaltyPackIndex }) {
    const formik = useFormik({
        initialValues: { level: '', pointsNeeded: '', multiplier: '' },
        validationSchema: loyaltyPointsSchema,
        onSubmit: (values) => {
            dispatch(createLoyaltyPack(values));
            setOpenModal(!openModal);
        }
    });

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                {loyaltyPackIndex}
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
                        <Typography style={{ color: theme.palette.primary.dark, fontWeight: 'bold' }} id="calculations-title">
                            * CALCULATIONS AS PER ENTERED DATA *
                        </Typography>
                        <Typography>Loyalty Points: {formik.values.multiplier ? formik.values.multiplier : 0} /1$</Typography>
                        <Typography color="error">
                            If player wagered $1000 then he will get {Math.round(1000 * formik.values.multiplier)} loyalty points
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
            </form>
        </Box>
    );
}

export default CreateLoyaltyPack;
