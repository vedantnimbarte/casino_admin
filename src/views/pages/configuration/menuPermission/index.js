import { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';

// REDUX
import { getAgentTypesList } from 'store/thunk/configuration/agentType.thunk';
import { useSelector, useDispatch } from 'react-redux';

function MenuPermissions() {
    const agentType = useSelector((state) => state.agentType);
    const dispatch = useDispatch();
    const [agentRole, setAgentRole] = useState('0');
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

    useEffect(() => {
        dispatch(getAgentTypesList());
    }, []);

    return (
        <Box>
            <MainCard
                title="Menu Permissions"
                secondary={
                    <FormControl>
                        <InputLabel htmlFor="agent">Select Agent Type</InputLabel>
                        <Select
                            value={agentRole}
                            onChange={(e) => setAgentRole(e.target.value)}
                            label="Select Agent Type"
                            name="agent"
                            id="agent"
                            placeholder="Select Agent Type"
                        >
                            <MenuItem value="0">Select Agent Type</MenuItem>
                            {agentType.agentTypesList?.map((parentAgentType, index) => (
                                <MenuItem value={parentAgentType.ROLE_ID} key={index}>
                                    {parentAgentType.ROLE_NAME}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                }
            >
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
