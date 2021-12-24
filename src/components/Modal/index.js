import { Modal, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import { IconX as CloseIcon } from '@tabler/icons';

function ModalComponent({ title, children, open, onClose }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            style={{
                width: '100vw',
                height: '100%',
                position: 'absolute',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <MainCard
                title={title}
                style={{ width: '50%' }}
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

export default ModalComponent;
