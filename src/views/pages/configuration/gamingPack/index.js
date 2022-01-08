import { useState } from 'react';
import { Box, Button, Grid, TextField, useTheme, useMediaQuery, MenuItem } from '@mui/material';
import { IconCirclePlus as AddIcon, IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { Formik, Form } from 'formik';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import Modal from 'components/ResponsiveModal';
import CommissionCard from './components/Cards/CommissionCard';

function GamingPack() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box>
            <MainCard
                title="Game Packs"
                secondary={
                    <Button startIcon={<AddIcon />} variant="contained" color="primary" sx={{ mx: 3 }} onClick={() => setOpen(!open)}>
                        Add Game Pack
                    </Button>
                }
            >
                <Box>
                    <Grid container spacing={4}>
                        <Grid item lg={3} md={3} sm={6} xs={12}>
                            <CommissionCard isOffer handleEdit={setOpen} />
                        </Grid>
                        <Grid item lg={3} md={3} sm={6} xs={12}>
                            <CommissionCard isOffer handleEdit={setOpen} />
                        </Grid>
                        <Grid item lg={3} md={3} sm={6} xs={12}>
                            <CommissionCard handleEdit={setOpen} />
                        </Grid>
                        <Grid item lg={3} md={3} sm={6} xs={12}>
                            <CommissionCard handleEdit={setOpen} />
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>

            <Modal title="Add New Game Pack" open={open} onClose={() => setOpen(!open)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Formik
                        initialValues={{ name: '', description: '', parentRole: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {(formik) => (
                            <Form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                                <TextField
                                    value={formik.values.name}
                                    type="text"
                                    label="Pack Name"
                                    name="name"
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    style={{ marginBottom: 10 }}
                                    fullWidth
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    value={formik.values.name}
                                    type="number"
                                    label="Amount of Coins"
                                    name="coins"
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    style={{ marginBottom: 10 }}
                                    fullWidth
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    value={formik.values.name}
                                    type="number"
                                    label="Amount of Majestic Diamonds"
                                    name="diamonds"
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    style={{ marginBottom: 10 }}
                                    fullWidth
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    value={formik.values.price}
                                    type="number"
                                    label="Price (in $)"
                                    name="price"
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    style={{ marginBottom: 10 }}
                                    fullWidth
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    value={formik.values.discount}
                                    select
                                    label="Discount"
                                    name="discount"
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    style={{ marginBottom: 10 }}
                                    fullWidth
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                >
                                    <MenuItem value="true">Discount</MenuItem>
                                    <MenuItem value="false">No Discount</MenuItem>
                                </TextField>
                                {formik.values.discount === 'true' && (
                                    <TextField
                                        value={formik.values.percentage}
                                        type="number"
                                        label="Discount Percentage"
                                        name="percentage"
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        style={{ marginBottom: 10 }}
                                        fullWidth
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                )}

                                <Box style={{ display: 'flex', justifyContent: 'right', float: 'right' }}>
                                    <Button
                                        type="reset"
                                        onClick={() => setOpen(!open)}
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
            </Modal>
        </Box>
    );
}

export default GamingPack;
