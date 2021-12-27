import React from 'react';
import { Box, FormControl, InputLabel, TextField, Button, MenuItem, Select } from '@mui/material';
import Modal from 'components/Modal';

function EditCommissionPlan({ openModal, setOpenModal, role, setRole, description, setDescription }) {
    return (
        <Modal title="Edit Commission Plans" open={openModal} onClose={() => setOpenModal(!openModal)}>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                <FormControl fullWidth style={{ margin: 10 }}>
                    <InputLabel id="agent-group-select">Agent Group</InputLabel>
                    <Select labelId="agent-group-select" label="Agent Group" value={role} onChange={(e) => setDescription(e.target.value)}>
                        <MenuItem value="MASTER_DISTRIBUTER">Master Distributer</MenuItem>
                        <MenuItem value="DISTRIBUTER">Distributer</MenuItem>
                        <MenuItem value="SUB_DISTRIBUTER">Sub Distributer</MenuItem>
                        <MenuItem value="STORE">Store</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth style={{ margin: 10 }}>
                    <InputLabel>Commission %</InputLabel>
                    <TextField
                        value={description}
                        type="text"
                        rows={4}
                        label="Commission %"
                        onChange={(e) => setDescription(e.target.value)}
                        variant="outlined"
                    />
                </FormControl>
                <Button
                    style={{
                        backgroundColor: '#673AB7',
                        color: '#fff',
                        margin: 10,
                        width: '50%',
                        alignSelf: 'center'
                    }}
                >
                    Update Commission Plan
                </Button>
            </Box>
        </Modal>
    );
}

export default EditCommissionPlan;
