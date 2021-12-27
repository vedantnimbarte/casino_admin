import { Box } from '@mui/material';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import Form from 'components/Form';

function AboutUs() {
    return (
        <Box>
            <MainCard title="About Us">
                <Box>
                    <Form />
                </Box>
            </MainCard>
        </Box>
    );
}

export default AboutUs;
