import { createSlice } from '@reduxjs/toolkit';
import { getSettingsData, updateSettings } from 'store/thunk/configuration/settings.thunk';

const SettingsSlice = createSlice({
    name: 'settings',
    initialState: {
        status: null,
        msg: '',
        data: [],
        dataIndex: ''
    },
    reducers: {
        setDataIndex: (state, { payload }) => {
            state.dataIndex = payload;
        }
    },
    extraReducers: {
        // Get Agent Type Reducers
        [getSettingsData.pending]: (state) => {
            state.status = 'loading';
        },
        [getSettingsData.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.data = payload.data;
                state.status = 'success';
            }
            if (payload.status === false || payload.status === undefined) {
                state.msg = payload.msg || 'Network Error';
                state.status = 'failed';
            }
        },
        [getSettingsData.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Update Agent Type Reducers
        [updateSettings.pending]: (state) => {
            state.status = 'loading';
        },
        [updateSettings.fulfilled]: (state, { payload }) => {
            if(payload) {
                if (payload.status === true) {
                state.msg = payload.msg;
                state.data = payload.data;

                state.status = 'success';
                }
                if (payload.status === false ) {
                    state.msg = payload.msg;
                    state.status = 'failed';
                }
            } else {
                state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
            }
        },
        [updateSettings.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        }
    }
});

export const { setDataIndex } = SettingsSlice.actions;

export default SettingsSlice.reducer;
