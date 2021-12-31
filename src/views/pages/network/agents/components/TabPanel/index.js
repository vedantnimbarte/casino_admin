import React from 'react';
import { Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Box role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Box>
    );
}

export default TabPanel;
