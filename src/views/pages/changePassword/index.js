import { useState } from 'react';
import { Box, Button, TextField, useTheme, Grid } from '@mui/material';
import { IconLock as ChangePasswordIcon, IconX as CancelIcon } from '@tabler/icons';
import { Formik, Form } from 'formik';

// Components

import MainCard from 'ui-component/cards/MainCard';

function ChangePassword() {
    const [openModal, setOpenModal] = useState(false);
    const theme = useTheme();

    return (
        <Box>
            <MainCard title="Change Password">
                <Box>
                    <form noValidate>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <Grid container spacing={2} direction="column">
                                    <Grid item>
                                        <TextField label="Current password" fullWidth />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="New password" fullWidth />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Confirm password" fullWidth />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Box style={{ float: 'right', padding: 5 }}>
                                    <Button startIcon={<CancelIcon />} variant="contained" color="error" style={{ marginRight: 5 }}>
                                        Reset
                                    </Button>
                                    <Button
                                        startIcon={<ChangePasswordIcon />}
                                        variant="contained"
                                        color="primary"
                                        style={{ marginLeft: 5 }}
                                    >
                                        Change Password
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </MainCard>
        </Box>
    );
}

export default ChangePassword;
