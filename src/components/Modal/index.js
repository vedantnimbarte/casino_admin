import propTypes from 'prop-types';
import { Modal, IconButton, useMediaQuery, useTheme, Grid, Typography } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import { IconX as CloseIcon } from '@tabler/icons';
import { withOrientationChange } from 'react-device-detect';

function ModalComponent({ title, children, open, onClose, isLandscape }) {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                sx={{
                    overflowY: 'auto',
                    display: 'block',
                    overflow: 'scroll'
                }}
            >
                <Grid xs={6} sm={6} md={6} lg={6} id="modal-card">
                    <MainCard
                        title={title}
                        style={{
                            margin: 0,
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                        secondary={
                            <IconButton onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        }
                    >
                        {children}
                        <Typography>{isMobileDevice}</Typography>
                    </MainCard>
                </Grid>
            </Modal>
        </>
    );
}
ModalComponent.propTypes = {
    title: propTypes.string.isRequired,
    open: propTypes.string.isRequired,
    onClose: propTypes.func.isRequired,
    children: propTypes.any.isRequired
};

export default withOrientationChange(ModalComponent);
