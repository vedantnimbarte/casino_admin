import { useState } from 'react';
import { IconButton, Tooltip, Box, Button, InputLabel, TextField } from '@mui/material';
// import DataTable from 'mui-datatables';
import { IconCirclePlus as AddIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';

function Games() {
    const [openModal, setOpenModal] = useState(false);
    const [gameImg, setGameImg] = useState('');
    const [gameUrl, setGameUrl] = useState('');

    const columns = ['ID', 'Image', 'URL', 'Action'];

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
                title="Games"
                secondary={
                    <Tooltip title="Add New Game">
                        <IconButton onClick={() => setOpenModal(!openModal)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
                <Box>
                    <DataTable title="Games List" data={data} columns={columns} options={options} />
                </Box>
            </MainCard>

            <Modal title="Add New Game" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <InputLabel>Game Image</InputLabel>
                    <TextField
                        value={gameImg}
                        type="file"
                        onChange={(e) => setGameImg(e.target.files[0])}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: 10, marginBottom: 10 }}
                    />
                    <TextField
                        value={gameUrl}
                        onChange={(e) => setGameUrl(e.target.value)}
                        variant="outlined"
                        label="Game URL"
                        fullWidth
                        style={{ marginTop: 10, marginBottom: 10 }}
                    />
                    <Button
                        style={{
                            backgroundColor: '#673AB7',
                            color: '#fff',
                            margin: 10,
                            width: '50%',
                            alignSelf: 'center'
                        }}
                    >
                        Add Game
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default Games;
