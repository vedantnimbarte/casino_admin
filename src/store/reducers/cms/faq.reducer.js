import { createSlice } from '@reduxjs/toolkit';
import { createFAQ, getFAQ, updateFAQ, deleteFAQ } from 'store/thunk/cms/faq.thunk';

const FAQSlice = createSlice({
    name: 'faq',
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
        // Get faq Reducers
        [getFAQ.pending]: (state) => {
            state.status = 'loading';
        },
        [getFAQ.fulfilled]: (state, { payload }) => {
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
        [getFAQ.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Create faq Reducers
        [createFAQ.pending]: (state) => {
            state.status = 'loading';
        },
        [createFAQ.fulfilled]: (state, { payload }) => {
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
        [createFAQ.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Update faq Reducers
        [updateFAQ.pending]: (state) => {
            state.status = 'loading';
        },
        [updateFAQ.fulfilled]: (state, { payload }) => {
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
        [updateFAQ.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Delete faq Reducers
        [deleteFAQ.pending]: (state) => {
            state.status = 'loading';
        },
        [deleteFAQ.fulfilled]: (state, { payload }) => {
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
        [deleteFAQ.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        }
    }
});

export const { setDataIndex } = FAQSlice.actions;

export default FAQSlice.reducer;
