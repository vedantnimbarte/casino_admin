import { createSlice } from '@reduxjs/toolkit';
import { getPermissions, updatePermissions } from 'store/thunk/configuration/permissions.thunk';

const PermissionsSlice = createSlice({
    name: 'permissions',
    initialState: {
        status: null,
        msg: '',
        totalRecords: 0,
        data: [],
        dataIndex: '',
        prevStatus: ''
    },
    reducers: {
        setDataIndex: (state, { payload }) => {
            state.dataIndex = payload;
        },
        updatePermission: (state, { payload }) => {
            state.prevStatus = state.data[payload.dataIndex].ISVIEW;
            state.data[payload.dataIndex].ISVIEW = payload.isView;
        },
        setPreviousPermission: (state, { payload }) => {
            state.data[payload.dataIndex].ISVIEW = state.prevStatus;
            state.prevStatus = '';
        }
    },
    extraReducers: {
        // Get permissions Reducers
        [getPermissions.pending]: (state) => {
            state.status = 'loading';
        },
        [getPermissions.fulfilled]: (state, { payload }) => {
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
        [getPermissions.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Update permissions Reducers
        [updatePermissions.pending]: (state) => {
            state.status = 'loading';
        },
        [updatePermissions.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg;
                state.data[state.dataIndex].ISVIEW = state.prevStatus;
                state.status = 'failed';
            }
        },
        [updatePermissions.rejected]: (state) => {
            state.status = 'failed';
            state.data[state.dataIndex].ISVIEW = state.prevStatus;
            state.msg = 'Something went wrong. Please try again.';
        }
    }
});

export const { setDataIndex, updatePermission, setPreviousPermission } = PermissionsSlice.actions;

export default PermissionsSlice.reducer;
