import { useState } from 'react';
import { IconButton, Tooltip, Box, Button, InputLabel, TextField, FormControl } from '@mui/material';
// import DataTable from 'mui-datatables';
import { IconCirclePlus as AddIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';
import NotFoundCard from 'components/NotFoundCard';

function Roles() {
    const [openModal, setOpenModal] = useState(false);
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');

    const columns = ['ID', 'Role', 'Action'];

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
                title="Roles"
                secondary={
                    <Tooltip title="Add New Role">
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

            <Modal title="Add New Role" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <FormControl fullWidth style={{ margin: 10 }}>
                        <InputLabel>Role Name</InputLabel>
                        <TextField
                            value={role}
                            type="text"
                            label="Role Name"
                            onChange={(e) => setRole(e.target.value.toUpperCase())}
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl fullWidth style={{ margin: 10 }}>
                        <InputLabel>Role Description</InputLabel>
                        <TextField
                            value={description}
                            type="text"
                            multiline
                            rows={4}
                            label="Role Description"
                            onChange={(e) => setDescription(e.target.value)}
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
                        Add Role
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default Roles;
