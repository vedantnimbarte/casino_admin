import React from 'react';
import { Box } from '@mui/material';
import Modal from 'components/Modal';
import DataTable from 'components/DataTable';

function CommissionHistory({ openModal, setOpenModal }) {
    const columns = ['ID', 'Master Distributer', 'Distributer', 'Sub Distributer', 'Store', 'Date'];

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
        <Modal title="Commission History" open={openModal} onClose={() => setOpenModal(!openModal)}>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                <DataTable title="Commission History" data={data} columns={columns} options={options} />
            </Box>
        </Modal>
    );
}

export default CommissionHistory;
