import propTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { Box } from '@mui/material';

function DataTable({ title, data, columns, options }) {
    return (
        <Box>
            <MUIDataTable title={title} data={data} columns={columns} options={options} id="datatable" />
        </Box>
    );
}

DataTable.propTypes = {
    title: propTypes.string.isRequired,
    data: propTypes.array.isRequired,
    columns: propTypes.array.isRequired,
    options: propTypes.array.isRequired
};

export default DataTable;
