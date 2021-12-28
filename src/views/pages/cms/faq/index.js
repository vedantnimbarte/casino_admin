import { useState } from 'react';
import { IconButton, Tooltip, Box, Button, TextField, FormControl } from '@mui/material';
import { IconCirclePlus as AddIcon } from '@tabler/icons';
import { Formik, Form } from 'formik';

// Components
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';
import MainCard from '../../../../ui-component/cards/MainCard';
import NotFoundCard from 'components/NotFoundCard';

import FAQSchema from 'schema/faq.schema';

function FAQ() {
    const [openModal, setOpenModal] = useState(false);
    const [faqState, setFaqState] = useState({ question: '', answer: '' });

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
                title="FAQ"
                secondary={
                    <Tooltip title="Add FAQ">
                        <IconButton onClick={() => setOpenModal(!openModal)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
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
                                <FormControl fullWidth style={{ margin: '10px 0' }}>
                                    <TextField
                                        value={formik.values.question}
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        label="Question"
                                        name="question"
                                        fullWidth
                                        error={formik.touched.question && Boolean(formik.errors.question)}
                                        helperText={formik.touched.question && formik.errors.question}
                                    />
                                </FormControl>
                                <FormControl fullWidth style={{ margin: '10px 0' }}>
                                    <TextField
                                        value={formik.answer}
                                        onChange={formik.handleChange}
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        label="Answer"
                                        name="answer"
                                        fullWidth
                                        error={formik.touched.answer && Boolean(formik.errors.answer)}
                                        helperText={formik.touched.answer && formik.errors.answer}
                                    />
                                </FormControl>
                                <Box style={{ display: 'flex' }}>
                                    <Button
                                        type="submit"
                                        style={{
                                            backgroundColor: '#673AB7',
                                            color: '#fff',
                                            margin: 10,
                                            width: '50%',
                                            alignSelf: 'center'
                                        }}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        style={{
                                            margin: 10,
                                            width: '50%'
                                        }}
                                        onClick={() => setOpenModal(!openModal)}
                                    >
                                        Cancel
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
