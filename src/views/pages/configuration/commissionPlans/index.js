import { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
// import DataTable from 'mui-datatables';
import { IconEditCircle as EditIcon, IconHistory as HistoryIcon, IconEdit as SaveIcon, IconRefresh as ResetIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import EditCommissionPlanModal from './components/Modal/EditCommissionPlan';
import CommissionHistoryModal from './components/Modal/CommissionHistory';
import CommissionCard from './components/CommissionCard';

function CommissionPlans() {
    const [openModal, setOpenModal] = useState(false);
    const [commissionHistory, setCommissionHistory] = useState(false);
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Box>
            <MainCard
                title="Comission Plans"
                secondary={
                    <Box>
                        <Button startIcon={<HistoryIcon />} onClick={() => setCommissionHistory(!commissionHistory)} color="secondary">
                            Commission History
                        </Button>
                        <Button startIcon={<SaveIcon />} variant="contained" color="primary" sx={{ mx: 3 }}>
                            Save Changes
                        </Button>
                        <Button startIcon={<ResetIcon />} variant="contained" color="error">
                            Discard Changes
                        </Button>
                    </Box>
                }
            >
                <Box>
                    <Grid container spacing={4}>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <CommissionCard title="Master Distributor" />
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <CommissionCard title="Distributor" />
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <CommissionCard title="Sub Distributor" />
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <CommissionCard title="Stores" />
                        </Grid>
                    </Grid>
                    {/* <DataTable title="Commission Plans" data={data} columns={columns} options={options} /> */}
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
