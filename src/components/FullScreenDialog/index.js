import React from 'react';
import { Box, Typography, Dialog, AppBar, IconButton, Button, Toolbar, Slide } from '@mui/material';
import { IconX as CloseIcon, IconRefresh as ResetIcon, IconDeviceFloppy as SaveIcon } from '@tabler/icons';

const Transition = (props, ref) => <Slide direction="up" ref={ref} {...props} />;
const TransitionComponent = React.forwardRef(Transition);

function FullScreenDialog({ title, children, dialogStatus, setDialogStatus, formik }) {
    return (
        <Dialog
            fullScreen
            title={title}
            open={dialogStatus}
            TransitionComponent={TransitionComponent}
            onClose={() => setDialogStatus(!dialogStatus)}
        >
            <>
                <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                    <AppBar sx={{ position: 'relative', backgroundColor: '#673AB7' }}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={() => setDialogStatus(!dialogStatus)} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h3" color="#fff">
                                {title}
                            </Typography>
                            <Button startIcon={<ResetIcon />} style={{ marginRight: 10 }} type="reset" autoFocus color="inherit">
                                Reset
                            </Button>
                            <Button startIcon={<SaveIcon />} type="submit" autoFocus color="inherit">
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {children}
                </form>
            </>
        </Dialog>
    );
}

export default FullScreenDialog;
