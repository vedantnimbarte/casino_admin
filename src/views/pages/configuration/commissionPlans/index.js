import { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { IconHistory as HistoryIcon, IconEdit as SaveIcon, IconRefresh as ResetIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import CommissionHistoryModal from './components/Modal/CommissionHistory';
import CommissionCard from './components/Cards/CommissionCard';

function CommissionPlans() {
    const [commissionHistory, setCommissionHistory] = useState(false);

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
                </Box>
            </MainCard>

            <CommissionHistoryModal openModal={commissionHistory} setOpenModal={setCommissionHistory} />
        </Box>
    );
}

export default CommissionPlans;
