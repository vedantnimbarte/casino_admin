import { Box, TextField, Button, useTheme, useMediaQuery } from '@mui/material';
import { IconChecks as ConfirmIcon, IconX as CancelIcon } from '@tabler/icons';
import propTypes from 'prop-types';

function AgentDeposit({ formik, openModal, setOpenModal }) {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                    value={formik.values.username}
                    type="text"
                    name="username-playerid"
                    label="Username or Agent Id"
                    onChange={formik.handleChange}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.username_playerId && Boolean(formik.errors.username_playerId)}
                    helperText={formik.touched.username_playerId && formik.errors.username_playerId}
                    required
                />

                <TextField
                    value={formik.values.email}
                    type="text"
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    required
                />
                <TextField
                    value={formik.values.phone}
                    type="text"
                    name="phone_no"
                    label="Phone No"
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    required
                />

                <TextField
                    value={formik.values.password}
                    type="password"
                    name="password"
                    label="Enter Your Password"
                    onChange={formik.handleChange}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    required
                />

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

AgentDeposit.propTypes = {
    formik: propTypes.object,
    openModal: propTypes.string,
    setOpenModal: propTypes.func
};

export default AgentDeposit;
