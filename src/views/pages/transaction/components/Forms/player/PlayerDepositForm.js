import { Box, FormControl, OutlinedInput, InputLabel, Button, useTheme, useMediaQuery, FormHelperText } from '@mui/material';
import { IconChecks as ConfirmIcon, IconX as CancelIcon } from '@tabler/icons';
import propTypes from 'prop-types';

function PlayerDeposit({ formik, openModal, setOpenModal }) {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit}>
                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.username_playerId && Boolean(formik.errors.username_playerId)}
                >
                    <InputLabel htmlFor="username-agentid">Username or Player Id</InputLabel>
                    <OutlinedInput
                        value={formik.values.username}
                        type="text"
                        id="username-agentid"
                        name="username-agentid"
                        label="Username or Agent Id"
                        onChange={formik.handleChange}
                        variant="outlined"
                        required
                    />
                    {formik.touched.username_playerId && formik.errors.username_playerId && (
                        <FormHelperText id="username-error">{formik.errors.username_playerId}</FormHelperText>
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
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        required
                    />
                    {formik.touched.email && formik.errors.email && <FormHelperText id="email-error">{formik.errors.email}</FormHelperText>}
                </FormControl>
                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                >
                    <InputLabel htmlFor="phone_no">Phone No</InputLabel>
                    <OutlinedInput
                        value={formik.values.phone}
                        type="text"
                        id="phone_no"
                        name="phone_no"
                        label="Phone No"
                        variant="outlined"
                        required
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <FormHelperText id="phone_no-error">{formik.errors.phone}</FormHelperText>
                    )}
                </FormControl>
                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.depositPoints && Boolean(formik.errors.depositPoints)}
                >
                    <InputLabel htmlFor="points_deposit">Enter points to deposit</InputLabel>
                    <OutlinedInput
                        value={formik.values.depositPoints}
                        type="number"
                        id="points_deposit"
                        name="points_deposit"
                        label="Enter points to deposit"
                        variant="outlined"
                        required
                    />

                    {formik.touched.depositPoints && formik.errors.depositPoints && (
                        <FormHelperText id="coin_pack-error">{formik.errors.depositPoints}</FormHelperText>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                >
                    <InputLabel htmlFor="password">Enter Your Password</InputLabel>
                    <OutlinedInput
                        value={formik.values.password}
                        type="password"
                        id="password"
                        name="password"
                        label="Enter Your Password"
                        onChange={formik.handleChange}
                        variant="outlined"
                        required
                    />
                    {formik.touched.password && formik.errors.password && (
                        <FormHelperText id="password-error">{formik.errors.password}</FormHelperText>
                    )}
                </FormControl>

                <Box style={{ display: 'flex', justifyContent: 'right' }}>
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
                        Cancel Transaction
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
                        startIcon={!isMobileDevice && <ConfirmIcon />}
                    >
                        Confirm Transaction
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

PlayerDeposit.propTypes = {
    formik: propTypes.object,
    openModal: propTypes.string,
    setOpenModal: propTypes.func
};

export default PlayerDeposit;
