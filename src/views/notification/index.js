import { useState } from 'react';
import { IconButton, Tooltip, Box, Button, MenuItem, Select, TextField, InputLabel } from '@mui/material';
// import DataTable from 'mui-datatables';
import { IconCirclePlus as AddIcon } from '@tabler/icons';

// Components
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';
import MainCard from '../../ui-component/cards/MainCard';

function Notification() {
    const [openModal, setOpenModal] = useState(false);
    const [type, setType] = useState('text');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [img, setImg] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const columns = ['ID', 'Format', 'Title', 'Message', 'Image', 'Video URL', 'Action'];

    const data = [];

    const options = {
        filter: false,
        print: false,
        download: false,
        search: false,
        selectableRows: false,
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 20]
    };

    return (
        <Box>
            <MainCard
                title="Notification"
                secondary={
                    <Tooltip title="Add Notification">
                        <IconButton onClick={() => setOpenModal(!openModal)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
                <Box>
                    <DataTable title="Notification's List" data={data} columns={columns} options={options} />
                </Box>
            </MainCard>

            <Modal title="Add New Notification" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <InputLabel>Select Notification Type</InputLabel>
                    <Select value={type} onChange={(e) => setType(e.target.value)}>
                        <MenuItem value="text">Text</MenuItem>
                        <MenuItem value="image">Image</MenuItem>
                        <MenuItem value="video">Video</MenuItem>
                    </Select>
                    <TextField
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        label="Title"
                        fullWidth
                        style={{ marginTop: 10, marginBottom: 10 }}
                    />
                    <TextField
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        multiline
                        rows={3}
                        variant="outlined"
                        label="Message"
                        fullWidth
                        style={{ marginTop: 10, marginBottom: 10 }}
                    />
                    {type === 'image' && (
                        <Box>
                            <InputLabel>Select Image</InputLabel>
                            <TextField
                                type="file"
                                value={img}
                                onChange={(e) => setImg(e.target.value)}
                                variant="outlined"
                                fullWidth
                                style={{ marginTop: 10, marginBottom: 10 }}
                            />
                        </Box>
                    )}
                    {type === 'video' && (
                        <TextField
                            type="url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            variant="outlined"
                            label="Video Url"
                            fullWidth
                            style={{ marginTop: 10, marginBottom: 10 }}
                        />
                    )}
                    <Button
                        style={{
                            backgroundColor: '#673AB7',
                            color: '#fff',
                            margin: 10,
                            width: '50%',
                            alignSelf: 'center'
                        }}
                    >
                        Add Notification
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default Notification;
