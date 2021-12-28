import { useState } from 'react';
import { IconButton, Tooltip, Box, Button, InputLabel, TextField } from '@mui/material';
// import DataTable from 'mui-datatables';
import { IconCirclePlus as AddIcon, IconUser as PlayerIcon, IconUsers as AgentIcon } from '@tabler/icons';

// Components
import DataTable from 'components/DataTable';
import ModalComponent from 'components/Modal';
import MainCard from '../../../ui-component/cards/MainCard';
import NotFoundCard from 'components/NotFoundCard';

function Transaction() {
    const [openModal, setOpenModal] = useState(false);
    const [sliderImg, setSliderImg] = useState('');

    const columns = ['Player ID', 'Username', 'UserID', 'Date and Time', 'Store Username', 'Amount', 'Type', 'Action'];

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
                title="Transactions"
                secondary={
                    <Tooltip title="Add New Slider">
                        <IconButton onClick={() => setOpenModal(!openModal)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
                <Box>
                    <Box>
                        <Button startIcon={<PlayerIcon />}>Player Transaction</Button>
                        <Button>Agent Transaction</Button>
                    </Box>
                    {data.length > 0 ? (
                        <DataTable title="Games List" data={data} columns={columns} options={options} />
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>

            <ModalComponent title="Add New Slider" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <InputLabel>Slider Image</InputLabel>
                    <TextField
                        value={sliderImg}
                        type="file"
                        onChange={(e) => setSliderImg(e.target.files[0])}
                        variant="outlined"
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
                        Add Slider
                    </Button>
                </Box>
            </ModalComponent>
        </Box>
    );
}

export default Transaction;
