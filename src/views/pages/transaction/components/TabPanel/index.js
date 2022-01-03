import { Box } from '@mui/material';
import propTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Box role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Box>
    );
}

TabPanel.propTypes = {
    children: propTypes.any,
    value: propTypes.string,
    index: propTypes.string
};

export default TabPanel;
