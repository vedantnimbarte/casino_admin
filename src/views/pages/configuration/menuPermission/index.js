import { Box } from '@mui/material';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';

function MenuPermissions() {
    const columns = ['ID', 'Permission', 'Allocated', 'Action'];

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
            <MainCard title="Menu Permissions">
                <Box>
                    {data.length > 0 ? (
                        <DataTable title="Menu Permissions List" data={data} columns={columns} options={options} />
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>
        </Box>
    );
}

export default MenuPermissions;
