import { Box } from '@mui/material';
import Modal from 'components/Modal';
import DataTable from 'components/DataTable';
import propTypes from 'prop-types';

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

CommissionHistory.propTypes = {
    openModal: propTypes.bool,
    setOpenModal: propTypes.func
};

export default CommissionHistory;
