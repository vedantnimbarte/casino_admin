import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { Box } from '@mui/material';

function DataTable({ title, data, columns, options }) {
    return (
        <Box>
            <MUIDataTable title={title} data={data} columns={columns} options={options} />
        </Box>
    );
}

export default DataTable;
