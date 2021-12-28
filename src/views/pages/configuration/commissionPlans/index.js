import { useState } from 'react';
import { IconButton, Tooltip, Box, Button, Grid, InputLabel, TextField, FormControl, Select, MenuItem, Typography } from '@mui/material';
// import DataTable from 'mui-datatables';
import { IconEditCircle as EditIcon, IconHistory as HistoryIcon } from '@tabler/icons';

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
                    <Grid container spacing={4}>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <CommissionCard />
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <CommissionCard />
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <CommissionCard />
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
