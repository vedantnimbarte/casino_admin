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
    useMediaQuery,
    FormHelperText
} from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import propTypes from 'prop-types';
import { useFormik } from 'formik';
import agentSchema from 'schema/agent.schema';

function UpdateAgent({ agent, onClose, openModal, dispatch, agentIdx, permissionsList, gameTypesList }) {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    const [gameType, setGameType] = React.useState([]);
    const [permissions, setPermissions] = React.useState([]);

    const formik = useFormik({
        initialValues: {
            username: '',
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            phone_no: '',
            agent_type: '',
            address: '',
            game_type_permissions: '',
            permissions: ''
        },
        validationSchema: agentSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

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
                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                >
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <OutlinedInput
                        value={formik.values.name}
                        type="text"
                        id="name"
                        name="name"
                        label="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.name && formik.errors.name && <FormHelperText>{formik.errors.name}</FormHelperText>}
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
                    {formik.touched.username && formik.errors.username && <FormHelperText>{formik.errors.username}</FormHelperText>}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        required
                    />
                    {formik.touched.email && formik.errors.email && <FormHelperText>{formik.errors.email}</FormHelperText>}
                </FormControl>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl
                            fullWidth
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
                            {formik.touched.password && formik.errors.password && <FormHelperText>{formik.errors.password}</FormHelperText>}
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
                                <FormHelperText>{formik.errors.confirm_password}</FormHelperText>
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
                    {formik.touched.phone_no && formik.errors.phone_no && <FormHelperText>{formik.errors.phone_no}</FormHelperText>}
                </FormControl>
                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                >
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <OutlinedInput
                        value={formik.values.address}
                        type="text"
                        id="address"
                        name="address"
                        label="Address"
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        multiline
                        rows={5}
                        required
                    />
                    {formik.touched.address && formik.errors.address && <FormHelperText>{formik.errors.address}</FormHelperText>}
                </FormControl>
                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.agent_type && Boolean(formik.errors.agent_type)}
                >
                    <InputLabel htmlFor="agent">Select Agent Type</InputLabel>
                    <Select
                        value={formik.values.agent}
                        id="agent"
                        name="agent"
                        label="Select Agent Type"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        required
                    >
                        <MenuItem value="master_distributor">Master Distributor</MenuItem>
                        <MenuItem value="distributor">Distributor</MenuItem>
                        <MenuItem value="sub_distributor">Sub Distributor</MenuItem>
                        <MenuItem value="store">Store</MenuItem>
                        <MenuItem value="cashior">Cashior</MenuItem>
                    </Select>
                    {formik.touched.agent_type && formik.errors.agent_type && <FormHelperText>{formik.errors.agent_type}</FormHelperText>}
                </FormControl>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
                            <InputLabel id="demo-multiple-chip-label">Select Game Type Permissions</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                fullWidth
                                value={gameType}
                                style={{ width: '99%' }}
                                onChange={handleGameTypeChange}
                                onBlur={formik.handleBlur}
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
                                <FormHelperText>{formik.errors.game_type_permissions}</FormHelperText>
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
                                fullWidth
                                style={{ width: '99%' }}
                                value={permissions}
                                onChange={handlePermissionsChange}
                                onBlur={formik.handleBlur}
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
                                <FormHelperText>{formik.errors.permissions}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
                <Box style={{ display: 'flex', justifyContent: 'right', float: 'right', padding: 0 }}>
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

UpdateAgent.propTypes = {
    formik: propTypes.object,
    openModal: propTypes.string,
    onClose: propTypes.func
};

export default UpdateAgent;
