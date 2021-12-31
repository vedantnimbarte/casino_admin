import React from 'react';
import { Paper, Typography } from '@mui/material';
import { IconFilesOff as NoDataIcon } from '@tabler/icons';

function NotFoundCard({ msg }) {
    return (
        <Paper style={{ display: 'flex', height: 60, justifyContent: 'center', alignItems: 'center' }} fullWidth>
            <NoDataIcon />
            <Typography style={{ fontWeight: 900, fontSize: 20 }}>{msg}</Typography>
        </Paper>
    );
}

export default NotFoundCard;
