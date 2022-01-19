import { Box, Button } from '@mui/material';
import { IconEdit as SaveIcon, IconRefresh as ResetIcon, IconEye as PreviewIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import Form from 'components/Form';

function PrivacyPolicy() {
    return (
        <Box>
            <MainCard
                title="Privacy Policy"
                secondary={
                    <Box>
                        <Button startIcon={<ResetIcon />} color="error" variant="contained">
                            Reset
                        </Button>
                        <Button startIcon={<SaveIcon />} color="primary" variant="contained" sx={{ mr: 3, ml: 3 }}>
                            Update
                        </Button>
                        <Button startIcon={<PreviewIcon />} color="secondary" variant="contained">
                            Preview
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

export default PrivacyPolicy;
