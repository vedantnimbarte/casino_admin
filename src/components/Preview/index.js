import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import { IconArrowBack as BackIcon } from '@tabler/icons';
import { useEffect } from 'react';

function Preview() {
    const settings = useSelector((state) => state.settings);
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (state.TITLE === undefined || state.DESCRIPTION === undefined) {
            navigate(-1);
        }
    }, []);

    return (
        <>
            <MainCard
                title="Preview"
                secondary={
                    <Button startIcon={<BackIcon />} onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                }
            >
                <Box>
                    <Typography variant="h2" style={{ textAlign: 'center' }}>
                        {state.TITLE}
                    </Typography>
                    <hr />
                    <div dangerouslySetInnerHTML={{ __html: state.DESCRIPTION }} />
                </Box>
            </MainCard>
        </>
    );
}

export default Preview;
