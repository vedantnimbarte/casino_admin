import { Box, Button, OutlinedInput, FormHelperText, InputLabel, FormControl } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import FAQSchema from 'schema/faq.schema';
import { createFAQ } from 'store/thunk/cms/faq.thunk';

function CreateFAQ({ dispatch, isMobileDevice, openModal, setOpenModal, theme }) {
    const formik = useFormik({
        initialValues: {
            question: '',
            answer: ''
        },
        validationSchema: FAQSchema,
        onSubmit: (values) => {
            dispatch(createFAQ(values));
            setOpenModal(!openModal);
        }
    });

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit}>
                <FormControl fullWidth style={{ margin: '10px 0' }} error={formik.touched.question && Boolean(formik.errors.question)}>
                    <InputLabel htmlFor="question">Question</InputLabel>
                    <OutlinedInput
                        value={formik.values.question}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        label="Question"
                        id="question"
                    />
                    {formik.touched.question && formik.errors.question && (
                        <FormHelperText id="question-error">{formik.errors.question}</FormHelperText>
                    )}
                </FormControl>
                <FormControl fullWidth style={{ margin: '10px 0' }} error={formik.touched.answer && Boolean(formik.errors.answer)}>
                    <InputLabel htmlFor="answer">Answer</InputLabel>
                    <OutlinedInput
                        value={formik.values.answer}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Answer"
                        id="answer"
                        name="answer"
                    />
                    {formik.touched.answer && formik.errors.answer && (
                        <FormHelperText id="answer-error">{formik.errors.answer}</FormHelperText>
                    )}
                </FormControl>
                <Box style={{ display: 'flex', justifyContent: 'right', float: 'right' }}>
                    <Button
                        type="reset"
                        onClick={() => setOpenModal(!openModal)}
                        variant="contained"
                        color={theme.palette.secondary.light[800]}
                        style={{
                            margin: 10,
                            color: 'white'
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

export default CreateFAQ;
