import { Box, Alert, Slide, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';

function AlertComponent({ status, message }) {
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [severity, setSeverity] = useState('error');

    useEffect(() => {
        if (status !== undefined || (status !== null && message !== undefined) || message !== null) {
            setAlertStatus(!alertStatus);
            setAlertMessage(message);
            setSeverity(status === 'true' ? 'success' : 'error');
        }
    }, [status, message]);

    return (
        <Box>
            <Snackbar
                open={alertStatus}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={6000}
                onClose={() => setAlertStatus(!alertStatus)}
            >
                <Alert severity={severity}>{alertMessage}</Alert>
            </Snackbar>
        </Box>
    );
}

export default AlertComponent;