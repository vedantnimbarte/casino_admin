import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Modal, IconButton, useMediaQuery, useTheme, Grid } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import { IconX as CloseIcon } from '@tabler/icons';
import { isMobile } from 'react-device-detect';

function ModalComponent({ title, children, open, onClose }) {
    const theme = useTheme();
    const isXSMobileDevice = useMediaQuery(theme.breakpoints.down('xs'));
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    const isTabletDevice = useMediaQuery(theme.breakpoints.down('md'));
    const isDesktoptDevice = useMediaQuery(theme.breakpoints.up('lg'));
    const isXDesktoptDevice = useMediaQuery(theme.breakpoints.down('xl'));
    // const isNotebookDevice = useMediaQuery('(width:1024px)');
    const [deviceStyleProperties, setDeviceStyleProperties] = useState({ maxWidth: '50%' });

    useEffect(() => {
        if (isXSMobileDevice) {
            setDeviceStyleProperties({ width: '90%', transform: 'translate(-50%, -35%)' });
        } else if (isMobileDevice) {
            setDeviceStyleProperties({ width: '98%', transform: 'translate(-50%, -35%)' });
        } else if (isTabletDevice) {
            setDeviceStyleProperties({ transform: 'translate(-50%, -50%)' });
        } else if (isDesktoptDevice) {
            setDeviceStyleProperties({ transform: 'translate(-50%, -50%)' });
        } else if (isXDesktoptDevice) {
            setDeviceStyleProperties({ transform: 'translate(-50%, -50%)' });
        }
    }, [isMobileDevice, isTabletDevice, isDesktoptDevice, isXDesktoptDevice, isXSMobileDevice]);

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
            <Grid xs={6} sm={6} md={6} lg={6}>
                <MainCard
                    title={title}
                    style={{
                        margin: 0,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
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
