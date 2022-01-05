import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Modal, IconButton, useMediaQuery, useTheme, Grid } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import { IconX as CloseIcon } from '@tabler/icons';

function ModalComponent({ title, children, open, onClose }) {
    const theme = useTheme();
    const isSmallDevice = useMediaQuery(theme.breakpoints.up('xs'));
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    const isTabletDevice = useMediaQuery(theme.breakpoints.down('md'));
    const isNotebookDevice = useMediaQuery('(min-width:1024px)');
    const [deviceStyleProperties, setDeviceStyleProperties] = useState({ maxWidth: '50%' });

    useEffect(() => {
        if (isSmallDevice) {
            setDeviceStyleProperties({ transform: 'translate(-50%, -30%)' });
        } else if (isMobileDevice) {
            setDeviceStyleProperties({ transform: 'translate(-50%, -35%)' });
        } else if (isTabletDevice) {
            setDeviceStyleProperties({ transform: 'translate(-50%, -30%)' });
        } else if (isNotebookDevice) {
            setDeviceStyleProperties({ transform: 'translate(-50%, -40%)' });
        } else {
            setDeviceStyleProperties({ transform: 'translate(-50%, -50%)' });
        }
    }, [isMobileDevice, isTabletDevice, isNotebookDevice]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                overflowY: 'auto',
                display: 'block',
                overflow: 'scroll'
            }}
        >
            <Grid sm={6} md={6} lg={6}>
                <MainCard
                    title={title}
                    style={{
                        margin: 0,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        // transform: 'translate(-50%,-30%)'
                        ...deviceStyleProperties
                    }}
                    secondary={
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    }
                >
                    {children}
                </MainCard>
            </Grid>
        </Modal>
    );
}

ModalComponent.propTypes = {
    title: propTypes.string.isRequired,
    open: propTypes.string.isRequired,
    onClose: propTypes.func.isRequired,
    children: propTypes.any.isRequired
};

export default ModalComponent;
