import { createSlice } from '@reduxjs/toolkit';
import { createAgentType, deleteAgentType, getAgentType, updateAgentType } from 'store/thunk/configuration/agentType.thunk';

const AgentTypeSlice = createSlice({
    name: 'agent_type',
    initialState: {
        status: null,
        msg: '',
        totalRecords: 0,
        data: []
    },
    extraReducers: {
        // Get Agent Type Reducers
        [getAgentType.pending]: (state) => {
            state.status = 'loading';
        },
        [getAgentType.fulfilled]: (state, { payload }) => {
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
        [getAgentType.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Create Agent Type Reducers
        [createAgentType.pending]: (state) => {
            state.status = 'loading';
        },
        [createAgentType.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network Error';
                state.status = 'failed';
            }
        },
        [createAgentType.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Update Agent Type Reducers
        [updateAgentType.pending]: (state) => {
            state.status = 'loading';
        },
        [updateAgentType.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg || 'Network Error';
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network not available';
                state.status = 'failed';
            }
        },
        [updateAgentType.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Delete Agent Type Reducers
        [deleteAgentType.pending]: (state) => {
            state.status = 'loading';
        },
        [deleteAgentType.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network not available';
                state.status = 'failed';
            }
        },
        [deleteAgentType.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        }
    }
});

export default AgentTypeSlice.reducer;
