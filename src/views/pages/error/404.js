import { Box } from '@mui/material';
import Error404Img from 'assets/images/404Error.png';

function Error404() {
    return (
        <Box>
            <img src={Error404Img} style={{ height: '50%', width: '100%' }} alt="Oops, Page your are looking for not found" />
        </Box>
    );
}

export default Error404;
