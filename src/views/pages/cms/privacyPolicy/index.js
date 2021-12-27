import { Box } from '@mui/material';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import Form from 'components/Form';

function PrivacyPolicy() {
    return (
        <Box>
            <MainCard title="Privacy Policy">
                <Box>
                    <Form />
                </Box>
            </MainCard>
        </Box>
    );
}

export default PrivacyPolicy;
