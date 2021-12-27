import { Box } from '@mui/material';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import Form from 'components/Form';

function PaymentTerms() {
    return (
        <Box>
            <MainCard title="Payment Terms">
                <Box>
                    <Form />
                </Box>
            </MainCard>
        </Box>
    );
}

export default PaymentTerms;
