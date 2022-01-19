import { createSlice } from '@reduxjs/toolkit';
import { createGameType, getGameType, updateGameType, deleteGameType } from 'store/thunk/configuration/gameType.thunk';

const GameTypeSlice = createSlice({
    name: 'game_type',
    initialState: {
        status: null,
        msg: '',
        totalRecords: 0,
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
        [getGameType.pending]: (state) => {
            state.status = 'loading';
        },
        [getGameType.fulfilled]: (state, { payload }) => {
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
        [getGameType.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Create Agent Type Reducers
        [createGameType.pending]: (state) => {
            state.status = 'loading';
        },
        [createGameType.fulfilled]: (state, { payload }) => {
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
        [createGameType.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Update Agent Type Reducers
        [updateGameType.pending]: (state) => {
            state.status = 'loading';
        },
        [updateGameType.fulfilled]: (state, { payload }) => {
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
        [updateGameType.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Delete Agent Type Reducers
        [deleteGameType.pending]: (state) => {
            state.status = 'loading';
        },
        [deleteGameType.fulfilled]: (state, { payload }) => {
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
        [deleteGameType.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        }
    }
});

export const { setDataIndex } = GameTypeSlice.actions;

export default GameTypeSlice.reducer;
