import { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery, useTheme, Tooltip, Button, IconButton } from '@mui/material';
import { IconCirclePlus as AddIcon, IconPencil as UpdateIcon, IconTrash as DeleteIcon } from '@tabler/icons';
import moment from 'moment';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';
import Modal from 'components/ResponsiveModal';
import AlertComponent from 'components/Alert';
import DeleteConfirmation from './components/Dialog/DeleteConfirmation';
import UpdateMenu from './components/Forms/UpdateMenu';
import CreateMenu from './components/Forms/CreateMenu';

import { useSelector, useDispatch } from 'react-redux';
import { getMenu } from 'store/thunk/configuration/menu.thunk';
import { setDataIndex } from 'store/reducers/configuration/menu.reducer';

function Menu() {
    const menu = useSelector((state) => state.menu);
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const [openModal, setOpenModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [menuId, setMenuId] = useState();

    const [pageLmit, setpageLmit] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [permissionIdx, setPermissionIdx] = useState();

    function handleUpdateModal(idx) {
        setPermissionIdx(idx);
        setUpdateModal(!updateModal);
    }

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
            name: 'MENU_NAME',
            label: 'NAME',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'MENU_SLUG',
            label: 'URL',
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
            name: 'action',
            label: 'Actions',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex) => (
                    <>
                        <Tooltip title="Update">
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    dispatch(setDataIndex(dataIndex));
                                    handleUpdateModal(dataIndex);
                                }}
                            >
                                <UpdateIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton
                                color="error"
                                onClick={() => {
                                    setOpenDialog(!openDialog);
                                    dispatch(setDataIndex(dataIndex));
                                    setMenuId(menu.data[dataIndex].MENU_ID);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
        }
    ];

    const options = {
        filter: true,
        print: false,
        download: false,
        search: false,
        selectableRows: false,
        rowsPerPage: pageLmit,
        pagination: true,
        rowsPerPageOptions: [10, 20, 30],
        serverSide: true,
        count: menu.totalRecords,
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
        dispatch(getMenu({ pageno: pageNo, limit: pageLmit }));
    }, [pageNo, pageLmit]);

    return (
        <>
            <Box>
                <MainCard
                    title="Menu Items"
                    secondary={
                        <Tooltip title="Add New Menu">
                            <Button
                                startIcon={<AddIcon />}
                                id="add-menu"
                                onClick={() => setOpenModal(!openModal)}
                                variant="contained"
                                color="secondary"
                            >
                                Add Menu
                            </Button>
                        </Tooltip>
                    }
                >
                    <Box>
                        {menu.data.length > 0 ? (
                            <DataTable title="Menu Item List" data={menu.data} columns={columns} options={options} />
                        ) : (
                            <NotFoundCard msg="Sorry, No data found" />
                        )}
                    </Box>
                </MainCard>

                {menu.status === 'failed' && <AlertComponent status="false" message={menu.msg} />}
                {menu.status === 'success' && <AlertComponent status="true" message={menu.msg} />}
            </Box>
            <Modal title="Update Menu" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                <UpdateMenu
                    menu={menu}
                    dispatch={dispatch}
                    isMobileDevice={isMobileDevice}
                    openModal={updateModal}
                    setOpenModal={setUpdateModal}
                    theme={theme}
                    permissionIdx={permissionIdx}
                />
            </Modal>

            <Modal title="Add New Menu" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <CreateMenu
                    dispatch={dispatch}
                    isMobileDevice={isMobileDevice}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    theme={theme}
                />
            </Modal>
            {/* Delete confirmation dialog */}
            <Box>
                <DeleteConfirmation menu={menu} dispatch={dispatch} openDialog={openDialog} setOpenDialog={setOpenDialog} menuId={menuId} />
            </Box>
        </>
    );
}

export default Menu;
