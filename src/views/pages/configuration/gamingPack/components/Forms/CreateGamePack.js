import { Box, Button, MenuItem, OutlinedInput, FormHelperText, InputLabel, FormControl, Select } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import gamingPackSchema from 'schema/gamingPack.schema';
import { createCoinPack } from 'store/thunk/configuration/coinPack.thunk';

function CreateGamePack({ dispatch, isMobileDevice, openModal, setOpenModal, theme }) {
    const formik = useFormik({
        initialValues: {
            name: '',
            coins: '',
            diamonds: '',
            price: '',
            discount: false,
            percentage: 0
        },
        validationSchema: gamingPackSchema,
        onSubmit: (values) => {
            dispatch(createCoinPack(values));
            setOpenModal(!openModal);
        }
    });

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <FormControl fullWidth error={formik.touched.name && Boolean(formik.errors.name)} style={{ marginBottom: 10 }}>
                    <InputLabel htmlFor="name">Pack Name</InputLabel>
                    <OutlinedInput
                        value={formik.values.name}
                        type="text"
                        id="name"
                        label="Pack Name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        fullWidth
                        required
                    />
                    {formik.touched.name && formik.errors.name && (
                        <FormHelperText error id="pack-name-error">
                            {formik.errors.name}
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl fullWidth error={formik.touched.coins && Boolean(formik.errors.coins)} style={{ marginBottom: 10 }}>
                    <InputLabel htmlFor="coins">Amount of Majestic Coins</InputLabel>
                    <OutlinedInput
                        value={formik.values.coins}
                        type="number"
                        label="Amount of Majestic Coins"
                        name="coins"
                        id="coins"
                        min="0"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                    />
                    {formik.touched.coins && formik.errors.coins && <FormHelperText id="coins-error">{formik.errors.coins}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={formik.touched.diamonds && Boolean(formik.errors.diamonds)} style={{ marginBottom: 10 }}>
                    <InputLabel htmlFor="diamonds">Amount of Majestic Diamonds</InputLabel>
                    <OutlinedInput
                        value={formik.values.diamonds}
                        type="number"
                        label="Amount of Majestic Diamonds"
                        name="diamonds"
                        id="diamonds"
                        min="0"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                    />
                    {formik.touched.diamonds && formik.errors.diamonds && (
                        <FormHelperText id="diamonds-error">{formik.errors.diamonds}</FormHelperText>
                    )}
                </FormControl>
                <FormControl fullWidth error={formik.touched.price && Boolean(formik.errors.price)} style={{ marginBottom: 10 }}>
                    <InputLabel htmlFor="price">Price (in $)</InputLabel>
                    <OutlinedInput
                        value={formik.values.price}
                        type="number"
                        label="Price (in $)"
                        name="price"
                        min="0"
                        id="price"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                    />
                    {formik.touched.price && formik.errors.price && <FormHelperText id="price-error">{formik.errors.price}</FormHelperText>}
                </FormControl>
                {/* <FormControl fullWidth error={formik.touched.discount && Boolean(formik.errors.discount)} style={{ marginBottom: 10 }}>
                    <InputLabel htmlFor="discount">Discount</InputLabel>
                    <Select
                        value={formik.values.discount}
                        select
                        label="Discount"
                        name="discount"
                        id="discount"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        helperText={formik.touched.discount && formik.errors.discount}
                    >
                        <MenuItem value="true">Discount</MenuItem>
                        <MenuItem value="false">No Discount</MenuItem>
                    </Select>
                </FormControl> */}
                {/* {formik.values.discount === 'true' && (
                    <FormControl
                        fullWidth
                        error={formik.touched.percentage && Boolean(formik.errors.percentage)}
                        style={{ marginBottom: 10 }}
                    >
                        <InputLabel htmlFor="discount-percentage">Discount Percentage</InputLabel>
                        <OutlinedInput
                            value={formik.values.percentage}
                            type="number"
                            label="Discount Percentage"
                            name="percentage"
                            id="discount-percentage"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            variant="outlined"
                        />
                        {formik.touched.percentage && formik.errors.percentage && (
                            <FormHelperText id="discount-percentage-error">{formik.errors.percentage}</FormHelperText>
                        )}
                    </FormControl>
                )} */}

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

export default CreateGamePack;
