import { useState } from 'react';
import { IconButton, Tooltip, Box, Button, InputLabel, TextField, FormControl } from '@mui/material';
// import DataTable from 'mui-datatables';
import { IconCirclePlus as AddIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';

function GameGroup() {
    const [openModal, setOpenModal] = useState(false);
    const [groupName, setGroupName] = useState('');

    const columns = ['ID', 'Name', 'Action'];

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
                title="Game Groups"
                secondary={
                    <Tooltip title="Add New Group">
                        <IconButton onClick={() => setOpenModal(!openModal)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
                <Box>
                    <DataTable title="Game Groups List" data={data} columns={columns} options={options} />
                </Box>
            </MainCard>

            <Modal title="Add New Game Group" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <FormControl fullWidth>
                        <InputLabel>Game Group Name</InputLabel>
                        <TextField
                            value={groupName}
                            type="text"
                            label="Game Group Name"
                            onChange={(e) => setGroupName(e.target.value.toUpperCase())}
                            variant="outlined"
                        />
                    </FormControl>
                    <Button
                        style={{
                            backgroundColor: '#673AB7',
                            color: '#fff',
                            margin: 10,
                            width: '50%',
                            alignSelf: 'center'
                        }}
                    >
                        Add Game Group
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default GameGroup;
