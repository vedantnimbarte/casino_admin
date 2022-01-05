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
                <AppBar sx={{ position: 'relative', backgroundColor: 'white' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h3" color="#000">
                            {title}
                        </Typography>
                        <IconButton edge="start" aria-label="close" onClick={() => setDialogStatus(!dialogStatus)}>
                            <CloseIcon color="black" />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box style={{ padding: 10 }}>{children}</Box>
            </>
        </Dialog>
    );
}

export default FullScreenDialog;
