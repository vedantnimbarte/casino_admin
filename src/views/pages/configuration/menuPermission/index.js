import { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, IconButton, Switch } from '@mui/material';
import { IconCheck as SaveIcon, IconX as CancelIcon } from '@tabler/icons';
import moment from 'moment';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';

// REDUX
import { getAgentTypesList, getAgentTypesWithIdList } from 'store/thunk/configuration/agentType.thunk';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuPermissions, updateMenuPermissions } from 'store/thunk/configuration/menuPermissions.thunk';
import AlertComponent from 'components/Alert';
import { setDataIndex, updateMenuPermission, setPreviousMenuPermission } from 'store/reducers/configuration/menuPermissions.reducer';

function MenuPermissions() {
    const agentType = useSelector((state) => state.agentType);
    const menuPermission = useSelector((state) => state.menuPermissions);
    const dispatch = useDispatch();
    const [agentRole, setAgentRole] = useState('0');

    const [pageLmit, setpageLmit] = useState(10);
    const [pageNo, setPageNo] = useState(0);

    const [updateStatus, setUpdateStatus] = useState({ isView: false, isNew: false, isUpdate: false, isDelete: false });
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
            name: 'Menu',
            label: 'NAME',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{value.MENU_NAME}</Typography>
            }
        },
        {
            name: 'ISVIEW',
            label: 'VIEW',
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (dataIndex) => (
                    <>
                        <Switch
                            checked={menuPermission.data[dataIndex].ISVIEW}
                            onChange={() => {
                                dispatch(updateMenuPermission({ dataIndex, key: 'isView', value: !menuPermission.data[dataIndex].ISVIEW }));
                                setUpdateStatus({ ...updateStatus, isView: !updateStatus.isView });
                                setPermissionIdx(dataIndex);
                            }}
                            color="secondary"
                        />
                        {updateStatus.isView === true && permissionIdx === dataIndex && (
                            <>
                                <IconButton
                                    color="primary"
                                    onClick={() => {
                                        dispatch(setDataIndex(dataIndex));
                                        dispatch(
                                            updateMenuPermissions({
                                                menuPermissionId: menuPermission.data[dataIndex].MENU_PERMISSION_ID,
                                                key: 'isView',
                                                value: menuPermission.data[dataIndex].ISVIEW
                                            })
                                        );
                                        setUpdateStatus({ ...updateStatus, isView: !updateStatus.isView });
                                    }}
                                >
                                    <SaveIcon />
                                </IconButton>
                                <IconButton color="error">
                                    <CancelIcon
                                        onClick={() => {
                                            dispatch(setPreviousMenuPermission({ dataIndex, key: 'isView' }));
                                            setUpdateStatus({ ...updateStatus, isView: !updateStatus.isUpdate });
                                        }}
                                    />
                                </IconButton>
                            </>
                        )}
                    </>
                )
            }
        },
        {
            name: 'ISNEW',
            label: 'CREATE',
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (dataIndex) => (
                    <>
                        <Switch
                            checked={menuPermission.data[dataIndex].ISNEW}
                            onChange={() => {
                                dispatch(updateMenuPermission({ dataIndex, key: 'isNew', value: !menuPermission.data[dataIndex].ISNEW }));
                                setUpdateStatus({ ...updateStatus, isNew: !updateStatus.isNew });
                                setPermissionIdx(dataIndex);
                            }}
                            color="secondary"
                        />
                        {updateStatus.isNew === true && permissionIdx === dataIndex && (
                            <>
                                <IconButton
                                    color="primary"
                                    onClick={() => {
                                        dispatch(setDataIndex(dataIndex));
                                        dispatch(
                                            updateMenuPermissions({
                                                menuPermissionId: menuPermission.data[dataIndex].MENU_PERMISSION_ID,
                                                key: 'isNew',
                                                value: menuPermission.data[dataIndex].ISNEW
                                            })
                                        );
                                        setUpdateStatus({ ...updateStatus, isNew: !updateStatus.isNew });
                                    }}
                                >
                                    <SaveIcon />
                                </IconButton>
                                <IconButton color="error">
                                    <CancelIcon
                                        onClick={() => {
                                            dispatch(setPreviousMenuPermission({ dataIndex, key: 'isNew' }));
                                            setUpdateStatus({ ...updateStatus, isNew: !updateStatus.isNew });
                                        }}
                                    />
                                </IconButton>
                            </>
                        )}
                    </>
                )
            }
        },
        {
            name: 'ISUPDATE',
            label: 'Update',
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (dataIndex) => (
                    <>
                        <Switch
                            checked={menuPermission.data[dataIndex].isUpdate}
                            onChange={() => {
                                dispatch(
                                    updateMenuPermission({ dataIndex, key: 'isUpdate', value: !menuPermission.data[dataIndex].isUpdate })
                                );
                                setUpdateStatus({ ...updateStatus, isUpdate: !updateStatus.isUpdate });
                                setPermissionIdx(dataIndex);
                            }}
                            color="secondary"
                        />
                        {updateStatus.isUpdate === true && permissionIdx === dataIndex && (
                            <>
                                <IconButton
                                    color="primary"
                                    onClick={() => {
                                        dispatch(setDataIndex(dataIndex));
                                        dispatch(
                                            updateMenuPermissions({
                                                menuPermissionId: menuPermission.data[dataIndex].MENU_PERMISSION_ID,
                                                key: 'isUpdate',
                                                value: menuPermission.data[dataIndex].isUpdate
                                            })
                                        );
                                        setUpdateStatus({ ...updateStatus, isUpdate: !updateStatus.isUpdate });
                                    }}
                                >
                                    <SaveIcon />
                                </IconButton>
                                <IconButton color="error">
                                    <CancelIcon
                                        onClick={() => {
                                            dispatch(setPreviousMenuPermission({ dataIndex, key: 'isUpdate' }));
                                            setUpdateStatus({ ...updateStatus, isUpdate: !updateStatus.isUpdate });
                                        }}
                                    />
                                </IconButton>
                            </>
                        )}
                    </>
                )
            }
        },
        {
            name: 'ISDELETE',
            label: 'DELETE',
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (dataIndex) => (
                    <>
                        <Switch
                            checked={menuPermission.data[dataIndex].isDelete}
                            onChange={() => {
                                dispatch(
                                    updateMenuPermission({ dataIndex, key: 'isDelete', value: !menuPermission.data[dataIndex].isDelete })
                                );
                                setUpdateStatus({ ...updateStatus, isDelete: !updateStatus.isDelete });
                                setPermissionIdx(dataIndex);
                            }}
                            color="secondary"
                        />
                        {updateStatus.isDelete === true && permissionIdx === dataIndex && (
                            <>
                                <IconButton
                                    color="primary"
                                    onClick={() => {
                                        dispatch(setDataIndex(dataIndex));
                                        dispatch(
                                            updateMenuPermissions({
                                                menuPermissionId: menuPermission.data[dataIndex].MENU_PERMISSION_ID,
                                                key: 'isDelete',
                                                value: menuPermission.data[dataIndex].isDelete
                                            })
                                        );
                                        setUpdateStatus({ ...updateStatus, isDelete: !updateStatus.isDelete });
                                    }}
                                >
                                    <SaveIcon />
                                </IconButton>
                                <IconButton color="error">
                                    <CancelIcon
                                        onClick={() => {
                                            dispatch(setPreviousMenuPermission({ dataIndex, key: 'isDelete' }));
                                            setUpdateStatus({ ...updateStatus, isDelete: !updateStatus.isDelete });
                                        }}
                                    />
                                </IconButton>
                            </>
                        )}
                    </>
                )
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
        count: menuPermission.totalRecords,
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
            dispatch(getMenuPermissions({ roleId: agentRole, limit: pageLmit, pageno: pageNo }));
        }
    }, [pageLmit, pageNo, agentRole]);

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
                    {menuPermission.data.length > 0 ? (
                        <DataTable title="Menu Permissions List" data={menuPermission.data} columns={columns} options={options} />
                    ) : (
                        <NotFoundCard msg="Sorry, No data found" />
                    )}
                </Box>
            </MainCard>

            {menuPermission.status === 'failed' && <AlertComponent status="false" message={menuPermission.msg} />}
            {menuPermission.status === 'success' && <AlertComponent status="true" message={menuPermission.msg} />}
        </Box>
    );
}

export default MenuPermissions;
