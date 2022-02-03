import { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, Tooltip, IconButton, Checkbox, Switch } from '@mui/material';
import { IconCheck as SaveIcon, IconX as CancelIcon } from '@tabler/icons';
import moment from 'moment';
// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';

import { getAgentTypesList, getAgentTypesWithIdList } from 'store/thunk/configuration/agentType.thunk';
import { useSelector, useDispatch } from 'react-redux';
import { getPermissions, updatePermissions } from 'store/thunk/configuration/permissions.thunk';
import { setDataIndex, setPreviousPermission, updatePermission } from 'store/reducers/configuration/permissions.reducer';
import AlertComponent from 'components/Alert';

function Permissions() {
    const permissions = useSelector((state) => state.permissions);
    const agentType = useSelector((state) => state.agentType);
    const dispatch = useDispatch();
    const [agentRole, setAgentRole] = useState('0');

    const [pageLmit, setpageLmit] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [updateStatus, setUpdateStatus] = useState(false);
    const [permissionIdx, setPermissionIdx] = useState();

    const columns = [
        {
            name: 'dataindex',
            label: 'SR NO',
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    const val = dataIndex + 1 + pageLmit * pageNo;
                    return val;
                }
            }
        },
        {
            name: 'AGENT_PERMISSION_VALUE',
            label: 'PERMISSIONS',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },

        {
            name: 'UPDATE_DATE',
            label: 'LAST UPDATED',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{moment(value).format('DD/MM/YYYY HH:MM A')}</Typography>
            }
        },
        {
            name: 'ISVIEW',
            label: 'PERMISSION ALLOCATED',
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (dataIndex) => (
                    <>
                        <Switch
                            checked={permissions.data[dataIndex].ISVIEW}
                            onChange={() => {
                                dispatch(updatePermission({ dataIndex, isView: !permissions.data[dataIndex].ISVIEW }));
                                setUpdateStatus(!updateStatus);
                                setPermissionIdx(dataIndex);
                            }}
                            color="secondary"
                        />
                        {updateStatus === true && permissionIdx === dataIndex && (
                            <>
                                <IconButton
                                    color="primary"
                                    onClick={() => {
                                        dispatch(setDataIndex(dataIndex));
                                        dispatch(
                                            updatePermissions({
                                                permissionId: permissions.data[dataIndex].AGENT_PERMISSION_ID,
                                                isView: permissions.data[dataIndex].ISVIEW
                                            })
                                        );
                                        setUpdateStatus(!updateStatus);
                                    }}
                                >
                                    <SaveIcon />
                                </IconButton>
                                <IconButton color="error">
                                    <CancelIcon
                                        onClick={() => {
                                            dispatch(setPreviousPermission({ dataIndex }));
                                            setUpdateStatus(!updateStatus);
                                        }}
                                    />
                                </IconButton>
                            </>
                        )}
                    </>
                )
            }
        }
    ];

    const options = {
        filter: false,
        sort: false,
        print: false,
        download: false,
        search: false,
        selectableRows: false,
        rowsPerPage: pageLmit,
        pagination: true,
        rowsPerPageOptions: [10, 20, 30],
        serverSide: true,
        count: permissions.totalRecords,
        sortThirdClickReset: true,
        jumpToPage: true,
        onChangeRowsPerPage: (page) => {
            setpageLmit(page);
        },
        onChangePage: (page) => {
            setPageNo(page);
        }
    };

    useEffect(() => {
        dispatch(getAgentTypesWithIdList(1));
    }, []);

    useEffect(() => {
        if (agentRole !== '0') {
            dispatch(getPermissions({ roleid: agentRole, limit: pageLmit, pageno: pageNo }));
        }
    }, [pageLmit, pageNo, agentRole]);

    return (
        <Box>
            <MainCard
                title="Permissions Allocated"
                secondary={
                    <FormControl>
                        <InputLabel htmlFor="agent">Select Agent Type</InputLabel>
                        <Select
                            value={agentRole}
                            onChange={(e) => setAgentRole(e.target.value)}
                            label="Select Agent Type"
                            name="agent"
                            id="agent"
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
                    {permissions.data.length > 0 ? (
                        <DataTable title="Permissions List" data={permissions.data} columns={columns} options={options} />
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>
            {permissions.status === 'failed' && <AlertComponent status="false" message={permissions.msg} />}
            {permissions.status === 'success' && <AlertComponent status="true" message={permissions.msg} />}
        </Box>
    );
}

export default Permissions;
