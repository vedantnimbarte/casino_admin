import propTypes from 'prop-types';
import { Modal, IconButton, useMediaQuery, useTheme, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { IconX as CloseIcon } from '@tabler/icons';
import FullScreenDialog from 'components/FullScreenDialog';
import { BrowserView, MobileView, isIOS, isTablet, withOrientationChange } from 'react-device-detect';

function ModalComponent({ title, children, open, onClose, isLandscape }) {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    // console.log(window.screen.orientation.angle);
    return (
        <>
            {/* MOBILE VIEW / TABLET VIEW */}
            <MobileView>
                {/* Showing modal if device is tablet and it is in portrait mode */}
                {isTablet && isLandscape.toString() === 'false' && (
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
                )}

                {/* Showing full screen dialog if device is tablet and in landscape mode */}
                {isTablet && isLandscape && (
                    <FullScreenDialog title={title} dialogStatus={open} setDialogStatus={onClose}>
                        {children}
                        <Typography>{isMobileDevice}</Typography>
                    </FullScreenDialog>
                )}

                {/* Showing full screen dialog if device is mobile, mode can be portrait as well as landscape  */}
                {!isTablet && (
                    <FullScreenDialog title={title} dialogStatus={open} setDialogStatus={onClose}>
                        {children}
                        <Typography>{isMobileDevice}</Typography>
                    </FullScreenDialog>
                )}
            </MobileView>

            {/* BROWSER VIEW */}
            <BrowserView>
                {(!isIOS || !isTablet) && (
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
                                    width: '60%',
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
                )}
            </BrowserView>
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
