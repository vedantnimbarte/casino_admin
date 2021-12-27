import { Box } from '@mui/material';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import Form from 'components/Form';

function TermsAndConditions() {
    return (
        <Box>
            <MainCard title="Terms and Conditions">
                <Box>
                    <Form />
                </Box>
            </MainCard>
        </Box>
    );
}

export default TermsAndConditions;
