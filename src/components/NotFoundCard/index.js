import { Paper, Typography } from '@mui/material';
import { IconFilesOff as NoDataIcon } from '@tabler/icons';
import propTypes from 'prop-types';

function NotFoundCard({ msg }) {
    return (
        <Paper style={{ display: 'flex', height: 60, justifyContent: 'center', alignItems: 'center' }} fullWidth>
            <NoDataIcon />
            <Typography style={{ fontWeight: 900, fontSize: 20 }}>{msg}</Typography>
        </Paper>
    );
}

NotFoundCard.propTypes = {
    msg: propTypes.string
};

export default NotFoundCard;
