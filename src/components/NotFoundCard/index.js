import React from 'react';
import { Paper, Typography } from '@mui/material';

function NotFoundCard({ msg }) {
    return (
        <Paper style={{ display: 'flex', height: 60, justifyContent: 'center', alignItems: 'center' }} fullWidth>
            <Typography style={{ fontWeight: 900, fontSize: 20 }}>{msg}</Typography>
        </Paper>
    );
}

export default NotFoundCard;
