import React from 'react';
import { Box, TextField, MenuItem, Grid } from '@mui/material';

function NewPlayerForm({ formik }) {
    return (
        <Box style={{ padding: 30 }}>
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
                <Grid item xs={12} sm={12} mg={6} lg={6}>
                    <TextField
                        value={formik.values.password}
                        type="password"
                        name="password"
                        label="Password"
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: 10, marginBottom: 10 }}
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
                        style={{ marginTop: 10, marginBottom: 10 }}
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
                label="Select Agent"
                onChange={formik.handleChange}
                variant="outlined"
                fullWidth
                style={{ marginTop: 10, marginBottom: 10 }}
                error={formik.touched.agent && Boolean(formik.errors.agent)}
                helperText={formik.touched.agent && formik.errors.agent}
                required
            >
                <MenuItem value="master_distributor">Master Distributor</MenuItem>
                <MenuItem value="distributor">Distributor</MenuItem>
                <MenuItem value="sub_distributor">Sub Distributor</MenuItem>
                <MenuItem value="store">Store</MenuItem>
            </TextField>
        </Box>
    );
}

export default NewPlayerForm;
