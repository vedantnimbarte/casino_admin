import { Box, TextField, MenuItem, Grid, Button, useTheme, useMediaQuery } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import propTypes from 'prop-types';

function NewPlayerForm({ formik, onClose, openModal }) {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <TextField
                    value={formik.values.name}
                    type="text"
                    name="name"
                    label="Name"
                    onChange={formik.handleChange}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    required
                />
                <TextField
                    value={formik.values.username}
                    type="text"
                    name="username"
                    label="Username"
                    onChange={formik.handleChange}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    required
                />
                <TextField
                    value={formik.values.email}
                    type="text"
                    name="email"
                    label="Email"
                    onChange={formik.handleChange}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    required
                />
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            value={formik.values.password}
                            type="password"
                            name="password"
                            label="Password"
                            onChange={formik.handleChange}
                            variant="outlined"
                            style={{ marginTop: 10, marginBottom: 10, width: '99%' }}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            value={formik.values.confirm_password}
                            type="password"
                            name="confirm_password"
                            label="Confirm Password"
                            onChange={formik.handleChange}
                            variant="outlined"
                            fullWidth
                            style={{ marginTop: 10, marginBottom: 10, width: '99%' }}
                            error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                            helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                            required
                        />
                    </Grid>
                </Grid>
                <TextField
                    value={formik.values.phone_no}
                    type="text"
                    name="phone_no"
                    label="Phone No"
                    onChange={formik.handleChange}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.phone_no && Boolean(formik.errors.phone_no)}
                    helperText={formik.touched.phone_no && formik.errors.phone_no}
                    required
                />
                <TextField
                    value={formik.values.agent}
                    select
                    name="agent"
                    label="Select Store"
                    onChange={formik.handleChange}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.agent && Boolean(formik.errors.agent)}
                    helperText={formik.touched.agent && formik.errors.agent}
                    required
                >
                    <MenuItem value="store">Store</MenuItem>
                </TextField>
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
