import { createSlice } from '@reduxjs/toolkit';
import { createLoyaltyPack, getLoyaltyPack, updateLoyaltyPack, deleteLoyaltyPack } from 'store/thunk/configuration/loyaltyPack.thunk';

const CoinPackSlice = createSlice({
    name: 'Loyalty_pack',
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
        [getLoyaltyPack.pending]: (state) => {
            state.status = 'loading';
        },
        [getLoyaltyPack.fulfilled]: (state, { payload }) => {
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
        [getLoyaltyPack.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Create Agent Type Reducers
        [createLoyaltyPack.pending]: (state) => {
            state.status = 'loading';
        },
        [createLoyaltyPack.fulfilled]: (state, { payload }) => {
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
        [createLoyaltyPack.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Update Agent Type Reducers
        [updateLoyaltyPack.pending]: (state) => {
            state.status = 'loading';
        },
        [updateLoyaltyPack.fulfilled]: (state, { payload }) => {
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
        [updateLoyaltyPack.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Delete Agent Type Reducers
        [deleteLoyaltyPack.pending]: (state) => {
            state.status = 'loading';
        },
        [deleteLoyaltyPack.fulfilled]: (state, { payload }) => {
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
        [deleteLoyaltyPack.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        }
    }
});

export const { setDataIndex } = CoinPackSlice.actions;

export default CoinPackSlice.reducer;
