import { Box, Button } from '@mui/material';
import { IconEdit as SaveIcon, IconRefresh as ResetIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import Form from 'components/Form';

function TermsAndConditions() {
    return (
        <Box>
            <MainCard
                title="Terms and Conditions"
                secondary={
                    <Box>
                        <Button startIcon={<ResetIcon />} color="error" variant="contained" sx={{ mr: 3 }}>
                            Reset
                        </Button>
                        <Button startIcon={<SaveIcon />} color="primary" variant="contained">
                            Update
                        </Button>
                    </Box>
                }
            >
                <Box>
                    <Form />
                </Box>
            </MainCard>
        </Box>
    );
}

export default TermsAndConditions;
