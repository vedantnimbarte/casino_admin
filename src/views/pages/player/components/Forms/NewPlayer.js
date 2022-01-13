import {
    Box,
    TextField,
    MenuItem,
    Grid,
    Button,
    useTheme,
    useMediaQuery,
    FormControl,
    Select,
    InputLabel,
    FormHelperText,
    OutlinedInput
} from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import propTypes from 'prop-types';

function NewPlayerForm({ formik, onClose, openModal }) {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                >
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <OutlinedInput
                        value={formik.values.name}
                        type="text"
                        name="name"
                        label="Name"
                        id="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        required
                    />
                    {formik.touched.name && formik.errors.name && <FormHelperText id="name-error">{formik.errors.name}</FormHelperText>}
                </FormControl>
                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                >
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <OutlinedInput
                        value={formik.values.username}
                        type="text"
                        id="username"
                        name="username"
                        label="Username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        required
                    />
                    {formik.touched.username && formik.errors.username && (
                        <FormHelperText id="username-error">{formik.errors.username}</FormHelperText>
                    )}
                </FormControl>
                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                >
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                        value={formik.values.email}
                        type="text"
                        name="email"
                        id="email"
                        label="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        required
                    />
                    {formik.touched.email && formik.errors.email && <FormHelperText id="email-error">{formik.errors.email}</FormHelperText>}
                </FormControl>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl
                            style={{ marginTop: 10, marginBottom: 10, width: '99%' }}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                        >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                value={formik.values.password}
                                type="password"
                                id="password"
                                name="password"
                                label="Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                required
                            />
                            {formik.touched.password && formik.errors.password && (
                                <FormHelperText id="password-error">{formik.errors.password}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl
                            fullWidth
                            style={{ marginTop: 10, marginBottom: 10, width: '99%' }}
                            error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                        >
                            <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
                            <OutlinedInput
                                value={formik.values.confirm_password}
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                label="Confirm Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                required
                            />
                            {formik.touched.confirm_password && formik.errors.confirm_password && (
                                <FormHelperText id="cpassword-error">{formik.errors.confirm_password}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.phone_no && Boolean(formik.errors.phone_no)}
                >
                    <InputLabel htmlFor="phone_no">Phone No</InputLabel>
                    <OutlinedInput
                        value={formik.values.phone_no}
                        type="text"
                        id="phone_no"
                        name="phone_no"
                        label="Phone No"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        required
                    />
                    {formik.touched.phone_no && formik.errors.phone_no && (
                        <FormHelperText id="phone_no-error">{formik.errors.phone_no}</FormHelperText>
                    )}
                </FormControl>
                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.agent && Boolean(formik.errors.agent)}
                >
                    <InputLabel id="agent">Select Store</InputLabel>
                    <Select
                        value={formik.values.agent}
                        id="agent"
                        name="agent"
                        label="Select Store"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        required
                    >
                        <MenuItem value="store">Store</MenuItem>
                    </Select>
                    {formik.touched.agent && formik.errors.agent && <FormHelperText id="agent-error">{formik.errors.agent}</FormHelperText>}
                </FormControl>
                <Box style={{ display: 'flex', justifyContent: 'right', float: 'right' }}>
                    <Button
                        type="reset"
                        onClick={() => onClose(!openModal)}
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

NewPlayerForm.propTypes = {
    formik: propTypes.object,
    openModal: propTypes.string,
    onClose: propTypes.func
};

export default NewPlayerForm;
