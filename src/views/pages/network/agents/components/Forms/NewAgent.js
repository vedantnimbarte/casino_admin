import React from 'react';
import {
    Box,
    TextField,
    MenuItem,
    Grid,
    Button,
    useTheme,
    Chip,
    Select,
    FormControl,
    InputLabel,
    OutlinedInput,
    Checkbox,
    ListItemText,
    Typography,
    useMediaQuery
} from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import propTypes from 'prop-types';

function NewPlayerForm({ formik, onClose, openModal }) {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    const [gameType, setGameType] = React.useState([]);
    const [permissions, setPermissions] = React.useState([]);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

    const gameTypesList = ['All', 'Fish', 'Table', 'Slot'];
    const permissionsList = ['All'];

    const handleGameTypeChange = (event) => {
        const {
            target: { value }
        } = event;
        setGameType(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };
    const handlePermissionsChange = (event) => {
        const {
            target: { value }
        } = event;
        setPermissions(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <TextField
                    value={formik.values.name}
                    type="text"
                    name="name"
                    label="Name"
                    size="small"
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
                    size="small"
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
                    size="small"
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
                            size="small"
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
                            size="small"
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
                    size="small"
                    onChange={formik.handleChange}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.phone_no && Boolean(formik.errors.phone_no)}
                    helperText={formik.touched.phone_no && formik.errors.phone_no}
                    required
                />
                <TextField
                    value={formik.values.address}
                    type="text"
                    name="address"
                    label="Address"
                    size="small"
                    onChange={formik.handleChange}
                    variant="outlined"
                    multiline
                    rows={5}
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                    required
                />
                <TextField
                    value={formik.values.agent}
                    select
                    name="agent"
                    label="Select Agent Type"
                    size="small"
                    onChange={formik.handleChange}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.agent_type && Boolean(formik.errors.agent_type)}
                    helperText={formik.touched.agent_type && formik.errors.agent_type}
                    required
                >
                    <MenuItem value="master_distributor">Master Distributor</MenuItem>
                    <MenuItem value="distributor">Distributor</MenuItem>
                    <MenuItem value="sub_distributor">Sub Distributor</MenuItem>
                    <MenuItem value="store">Store</MenuItem>
                    <MenuItem value="cashior">Cashior</MenuItem>
                </TextField>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
                            <InputLabel id="demo-multiple-chip-label">Select Game Type Permissions</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                size="small"
                                fullWidth
                                value={gameType}
                                style={{ width: '99%' }}
                                onChange={handleGameTypeChange}
                                error={formik.touched.game_type_permissions && Boolean(formik.errors.game_type_permissions)}
                                helperText={formik.touched.game_type_permissions && formik.errors.game_type_permissions}
                                input={<OutlinedInput id="select-multiple-chip" label="Select Game Type Permissions" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {gameTypesList.map((gt) => (
                                    <MenuItem key={gt} value={gt}>
                                        <Checkbox checked={gameType.indexOf(gt) > -1} />
                                        <ListItemText primary={gt} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.game_type_permissions && Boolean(formik.errors.game_type_permissions) && (
                                <Typography sx={{ fontSize: 12, ml: 2, mt: 1 }} color="error">
                                    {formik.errors.game_type_permissions}
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
                            <InputLabel id="demo-multiple-chip-label">Select Permissions</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                size="small"
                                fullWidth
                                style={{ width: '99%' }}
                                value={permissions}
                                onChange={handlePermissionsChange}
                                error={formik.touched.permissions && Boolean(formik.errors.permissions)}
                                helperText={formik.touched.permissions && formik.errors.permissions}
                                input={<OutlinedInput id="select-multiple-chip" label="Select Permissions" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {permissionsList.map((permission) => (
                                    <MenuItem key={permission} value={permission}>
                                        <Checkbox checked={permissions.indexOf(permission) > -1} />
                                        <ListItemText primary={permission} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.permissions && Boolean(formik.errors.permissions) && (
                                <Typography sx={{ fontSize: 12, ml: 2, mt: 1 }} color="error">
                                    {formik.errors.permissions}
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
                <Box style={{ display: 'flex', justifyContent: 'right', padding: 0 }}>
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
