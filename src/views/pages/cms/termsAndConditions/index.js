import { Box, Button } from '@mui/material';
import { IconEdit as SaveIcon, IconRefresh as ResetIcon, IconEye as PreviewIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import Form from 'components/Form';
import { useState } from 'react';

function TermsAndConditions() {
    const [pageTitle, setPageTitle] = useState('Terms and Conditions');
    const [status, setStatus] = useState(false);

    return (
        <Box>
            <MainCard
                title="Terms and Conditions"
                secondary={
                    <Box>
                        <Button startIcon={<ResetIcon />} color="error" variant="contained">
                            Reset
                        </Button>
                        <Button
                            startIcon={<SaveIcon />}
                            color="primary"
                            variant="contained"
                            sx={{ mr: 3, ml: 3 }}
                            onClick={() => setStatus(!status)}
                        >
                            Update
                        </Button>
                        {/* <Button startIcon={<PreviewIcon />} color="secondary" variant="contained">
                            Preview
                        </Button> */}
                    </Box>
                }
            >
                <Box>
                    <Form pageTitle={pageTitle} updateStatus={status} />
                </Box>
            </MainCard>
        </Box>
    );
}

export default TermsAndConditions;
