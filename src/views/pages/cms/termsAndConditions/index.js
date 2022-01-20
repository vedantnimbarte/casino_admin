import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { IconEdit as SaveIcon, IconRefresh as ResetIcon, IconEye as PreviewIcon } from '@tabler/icons';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from 'store/thunk/configuration/settings.thunk';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import Form from 'components/Form';

function TermsAndConditions() {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.settings);
    const navigate = useNavigate();
    const [pageTitle, setPageTitle] = useState('Terms and Conditions');

    const handleUpdate = () => {
        dispatch(
            updateSettings({
                title: settings.updatedData.TITLE,
                description: settings.updatedData.DESCRIPTION,
                pageTitle,
                id: settings.updatedData.SETTING_ID
            })
        );
    };

    const handlePreview = () => {
        navigate('/cms/preview', { state: settings.updatedData ? settings.updatedData : settings.data });
    };

    return (
        <Box>
            <MainCard
                title="Terms and Conditions"
                secondary={
                    <Box>
                        <Button startIcon={<ResetIcon />} color="error" variant="contained">
                            Reset
                        </Button>
                        <Button
                            startIcon={<SaveIcon />}
                            color="primary"
                            variant="contained"
                            sx={{ mr: 3, ml: 3 }}
                            onClick={() => handleUpdate()}
                        >
                            Update
                        </Button>
                        <Button startIcon={<PreviewIcon />} color="secondary" variant="contained" onClick={() => handlePreview()}>
                            Preview
                        </Button>
                    </Box>
                }
            >
                <Box>
                    <Form pageTitle={pageTitle} />
                </Box>
            </MainCard>
        </Box>
    );
}

export default TermsAndConditions;
