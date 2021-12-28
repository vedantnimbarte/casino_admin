import { useState } from 'react';
import { IconButton, Tooltip, Box, Button, TextField } from '@mui/material';
// import DataTable from 'mui-datatables';
import { IconCirclePlus as AddIcon } from '@tabler/icons';

// Components
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';
import MainCard from '../../../../ui-component/cards/MainCard';
import NotFoundCard from 'components/NotFoundCard';

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
                    <TextField
                        value={faqState.question}
                        onChange={(e) => setFaqState({ ...faqState, question: e.target.value })}
                        variant="outlined"
                        label="Question"
                        fullWidth
                        style={{ marginTop: 10, marginBottom: 10 }}
                    />
                    <TextField
                        value={faqState.answer}
                        onChange={(e) => setFaqState({ ...faqState, answer: e.target.value })}
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Answer"
                        fullWidth
                        style={{ marginTop: 10, marginBottom: 10 }}
                    />
                    <Button
                        style={{
                            backgroundColor: '#673AB7',
                            color: '#fff',
                            margin: 10,
                            width: '50%',
                            alignSelf: 'center'
                        }}
                    >
                        Add FAQ
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default FAQ;
