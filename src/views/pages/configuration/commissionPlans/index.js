import { useState } from 'react';
import { IconButton, Tooltip, Box, Button, InputLabel, TextField, FormControl, Select, MenuItem } from '@mui/material';
// import DataTable from 'mui-datatables';
import { IconEditCircle as EditIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';

function CommissionPlans() {
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
                title="Comission Plans"
                secondary={
                    <Tooltip title="Edit Commission Plan">
                        <IconButton onClick={() => setOpenModal(!openModal)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
                <Box>
                    <DataTable title="Commission Plans" data={data} columns={columns} options={options} />
                </Box>
            </MainCard>

            <Modal title="Edit Commission Plans" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <FormControl fullWidth style={{ margin: 10 }}>
                        <InputLabel id="agent-group-select">Agent Group</InputLabel>
                        <Select labelId="agent-group-select" label="Agent Group">
                            <MenuItem>Master Distributer</MenuItem>
                            <MenuItem>Distributer</MenuItem>
                            <MenuItem>Sub Distributer</MenuItem>
                            <MenuItem>Store</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth style={{ margin: 10 }}>
                        <InputLabel>Commission %</InputLabel>
                        <TextField
                            value={description}
                            type="text"
                            rows={4}
                            label="Commission %"
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
                        Update Commission Plan
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default CommissionPlans;
