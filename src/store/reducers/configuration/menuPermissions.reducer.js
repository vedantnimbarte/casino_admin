import { createSlice } from '@reduxjs/toolkit';
import {
    getMenuPermissions,
    createMenuPermissions,
    updateMenuPermissions,
    deleteMenuPermissions,
    getAgentTypesList
} from 'store/thunk/configuration/menuPermissions.thunk';

const MenuPermissionsSlice = createSlice({
    name: 'menu_permissions',
    initialState: {
        status: null,
        msg: '',
        totalRecords: 0,
        data: [],
        agentTypesList: [],
        dataIndex: '',
        prevStatus: { isView: '', isNew: '', isUpdate: '', isDelete: '' }
    },
    reducers: {
        setDataIndex: (state, { payload }) => {
            state.dataIndex = payload;
        },
        updateMenuPermission: (state, { payload }) => {
            state.key = payload;
            state.prevStatus = { ...state.prevStatus, [payload.key]: state.data[payload.dataIndex].ISVIEW };
            state.data[payload.dataIndex][payload.key.toUpperCase()] = payload.value;
        },
        setPreviousMenuPermission: (state, { payload }) => {
            state.data[payload.dataIndex][payload.key.toUpperCase()] = state.prevStatus[payload.key];
            // state.data[payload.dataIndex].ISNEW = state.prevStatus.isNew;
            // state.data[payload.dataIndex].ISDELETE = state.prevStatus.isDelete;
            // state.data[payload.dataIndex].ISUPDATE = state.prevStatus.isUpdate;
            state.prevStatus = { isView: '', isNew: '', isUpdate: '', isDelete: '' };
        }
    },
    extraReducers: {
        // Get permissions Reducers
        [getMenuPermissions.pending]: (state) => {
            state.status = 'loading';
        },
        [getMenuPermissions.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.data = payload.data;
                state.totalRecords = payload.total;
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network Error';
                state.status = 'failed';
            }
        },
        [getMenuPermissions.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Get permissions Reducers
        [getAgentTypesList.pending]: (state) => {
            state.status = 'loading';
        },
        [getAgentTypesList.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.agentTypesList = payload.data;
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network Error';
                state.status = 'failed';
            }
        },
        [getAgentTypesList.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Create permissions Reducers
        [createMenuPermissions.pending]: (state) => {
            state.status = 'loading';
        },
        [createMenuPermissions.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.data.unshift(payload.data);
                if (state.data.length >= 10) {
                    state.data.pop();
                }
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network Error';
                state.status = 'failed';
            }
        },
        [createMenuPermissions.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Update permissions Reducers
        [updateMenuPermissions.pending]: (state) => {
            state.status = 'loading';
        },
        [updateMenuPermissions.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.data[parseInt(state.dataIndex)] = payload.data;
                if (state.data.length >= 10) {
                    state.data.pop();
                }
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg;
                state.status = 'failed';
            }
        },
        [updateMenuPermissions.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Delete permissions Reducers
        [deleteMenuPermissions.pending]: (state) => {
            state.status = 'loading';
        },
        [deleteMenuPermissions.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.data.splice(state.dataIndex, 1);
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network not available';
                state.status = 'failed';
            }
        },
        [deleteMenuPermissions.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        }
    }
});

export const { setDataIndex, updateMenuPermission, setPreviousMenuPermission } = MenuPermissionsSlice.actions;

export default MenuPermissionsSlice.reducer;
