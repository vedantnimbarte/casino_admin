import { Box, Button, TextField, OutlinedInput, FormHelperText, InputLabel, FormControl, Select } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import { updateSliderSchema } from 'schema/slider.schema';
import { updateSlider } from 'store/thunk/cms/slider.thunk';

function UpdateSlider({ dispatch, isMobileDevice, openModal, setOpenModal, theme, sliderIndex, slider }) {
    const formik = useFormik({
        initialValues: {
            name: slider.data[sliderIndex].SLIDER_NAME || '',
            description: slider.data[sliderIndex].DESCRIPTION || '',
            id: slider.data[sliderIndex].SLIDER_ID
        },
        validationSchema: updateSliderSchema,
        onSubmit: (values) => {
            if (!values.image) {
                const data = {};
                Object.assign(data, { SLIDER_NAME: values.name });
                Object.assign(data, { DESCRIPTION: values.description });
                dispatch(updateSlider({ data, id: values.id, isFile: false }));
            } else {
                const data = new FormData();
                data.append('SLIDER_NAME', values.name);
                data.append('DESCRIPTION', values.description);
                data.append('FILEUPLOAD', values.image, values.image.name);
                data.append('oldImage', slider.data[sliderIndex].SLIDER_IMAGE);

                dispatch(updateSlider({ data, id: values.id, isFile: true }));
            }

            setOpenModal(!openModal);
        }
    });

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <TextField
                    value={formik.values.name}
                    type="text"
                    label="Slider Name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    fullWidth
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    required
                />
                <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
                    <TextField
                        type="file"
                        name="image"
                        onChange={(e) => formik.setFieldValue(e.target.name, e.target.files[0])}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        fullWidth
                        error={formik.touched.image && Boolean(formik.errors.image)}
                        helperText={formik.touched.image && formik.errors.image}
                        required
                    />
                </FormControl>
                <TextField
                    value={formik.values.description}
                    type="text"
                    name="description"
                    multiline
                    rows={5}
                    style={{ marginTop: 10, marginBottom: 10 }}
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    label="Description"
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />

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

export default UpdateSlider;
