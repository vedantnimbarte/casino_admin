import { useState } from 'react';
import { IconButton, Tooltip, Box, Button, InputLabel, TextField, FormControl } from '@mui/material';
// import DataTable from 'mui-datatables';
import { IconCirclePlus as AddIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';

function Permissions() {
    const [openModal, setOpenModal] = useState(false);
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');

    const columns = ['ID', 'Permission', 'Allocated', 'Action'];

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
            <MainCard title="Permissions Allocated">
                <Box>
                    <DataTable title="Permissions List" data={data} columns={columns} options={options} />
                </Box>
            </MainCard>
        </Box>
    );
}

export default Permissions;
