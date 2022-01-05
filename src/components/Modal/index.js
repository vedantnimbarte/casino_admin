import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Modal, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import { IconX as CloseIcon } from '@tabler/icons';

function ModalComponent({ title, children, open, onClose }) {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    const isTabletDevice = useMediaQuery(theme.breakpoints.down('md'));
    const [deviceStyleProperties, setDeviceStyleProperties] = useState({ maxWidth: '50%' });

    useEffect(() => {
        if (isMobileDevice) {
            setDeviceStyleProperties({ maxWidth: '95%', marginTop: '5%' });
        } else if (isTabletDevice) {
            setDeviceStyleProperties({ maxWidth: '85%' });
        } else {
            setDeviceStyleProperties({ maxWidth: '50%' });
        }
    }, [isMobileDevice, isTabletDevice]);

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
            <MainCard
                title={title}
                style={{
                    margin: 0,
                    width: '100%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: isMobileDevice ? 'translate(-50%, -30%)' : 'translate(-50%, -50%)',
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
