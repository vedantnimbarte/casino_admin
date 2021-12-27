import { useState } from 'react';
import { IconButton, Tooltip, Box, Button, InputLabel, TextField, FormControl, Select, MenuItem, Typography } from '@mui/material';
// import DataTable from 'mui-datatables';
import { IconEditCircle as EditIcon, IconHistory as HistoryIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import EditCommissionPlanModal from './components/Modal/EditCommissionPlan';
import CommissionHistoryModal from './components/Modal/CommissionHistory';

function CommissionPlans() {
    const [openModal, setOpenModal] = useState(false);
    const [commissionHistory, setCommissionHistory] = useState(false);
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
                    <Box style={{ display: 'flex', justifyContent: 'right', marginBottom: 10 }} fullWidth>
                        <Button
                            startIcon={<HistoryIcon />}
                            style={{ color: 'gray' }}
                            onClick={() => setCommissionHistory(!commissionHistory)}
                        >
                            Commission History
                        </Button>
                    </Box>
                    <DataTable title="Commission Plans" data={data} columns={columns} options={options} />
                </Box>
            </MainCard>

            <EditCommissionPlanModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                role={role}
                setRole={setRole}
                description={description}
                setDescription={setDescription}
            />
            <CommissionHistoryModal openModal={commissionHistory} setOpenModal={setCommissionHistory} />
        </Box>
    );
}

export default CommissionPlans;
