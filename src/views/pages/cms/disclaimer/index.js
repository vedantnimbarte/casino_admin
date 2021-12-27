import { Box } from '@mui/material';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import Form from 'components/Form';

function Disclaimer() {
    return (
        <Box>
            <MainCard title="Disclaimer">
                <Box>
                    <Form />
                </Box>
            </MainCard>
        </Box>
    );
}

export default Disclaimer;
