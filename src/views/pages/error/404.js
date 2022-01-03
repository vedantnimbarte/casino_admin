import { Box, Typography, useTheme } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Error404Img from 'assets/images/404Error.png';

function Error404() {
    const theme = useTheme();

    return (
        <Box>
            {/* <MainCard> */}
            <img src={Error404Img} style={{ height: '50%', width: '100%' }} alt="Oops, Page your are looking for not found" />
            {/* </MainCard> */}
        </Box>
    );
}

export default Error404;
