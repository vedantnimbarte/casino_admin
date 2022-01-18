import { useState } from 'react';
import { Box, Button, FormControl, useTheme, useMediaQuery, Divider, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { IconCirclePlus as AddIcon, IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { Formik, Form } from 'formik';

// Components
import DataTable from 'components/DataTable';
import Modal from 'components/ResponsiveModal';
import MainCard from '../../../../ui-component/cards/MainCard';
import NotFoundCard from 'components/NotFoundCard';

import FAQSchema from 'schema/faq.schema';

function FAQ() {
    const [openModal, setOpenModal] = useState(false);
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const columns = ['ID', 'Question', 'Answer', 'Action'];

    const data = [];

    const options = {
        filter: false,
        print: false,
        download: false,
        search: false,
        selectableRows: false,
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 20]
    };

    return (
        <Box>
            <MainCard
                title={!isMobileDevice && 'FAQ'}
                secondary={
                    <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
                        Add FAQ
                    </Button>
                }
            >
                {isMobileDevice && (
                    <>
                        <Button
                            startIcon={<AddIcon />}
                            fullWidth
                            onClick={() => setOpenModal(!openModal)}
                            variant="contained"
                            color="secondary"
                            style={{ marginBottom: 15 }}
                        >
                            Add FAQ
                        </Button>
                        <Divider />
                    </>
                )}
                <Box>
                    {data.length > 0 ? (
                        <DataTable title="Games List" data={data} columns={columns} options={options} />
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>

            <Modal title="Add New FAQ" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Formik
                        initialValues={{ question: '', answer: '' }}
                        validationSchema={FAQSchema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {(formik) => (
                            <Form noValidate onSubmit={formik.handleSubmit}>
                                <FormControl
                                    fullWidth
                                    style={{ margin: '10px 0' }}
                                    error={formik.touched.question && Boolean(formik.errors.question)}
                                >
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
                                <FormControl
                                    fullWidth
                                    style={{ margin: '10px 0' }}
                                    error={formik.touched.answer && Boolean(formik.errors.answer)}
                                >
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
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </Box>
    );
}

export default FAQ;
