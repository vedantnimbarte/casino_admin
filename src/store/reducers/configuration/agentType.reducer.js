import { createSlice } from '@reduxjs/toolkit';
import {
    createAgentType,
    deleteAgentType,
    getAgentType,
    getAgentTypesList,
    updateAgentType,
    getAgentTypesWithIdList
} from 'store/thunk/configuration/agentType.thunk';

const AgentTypeSlice = createSlice({
    name: 'agent_type',
    initialState: {
        status: null,
        msg: '',
        totalRecords: 0,
        data: [],
        dataIndex: '',
        agentTypesList: []
    },
    reducers: {
        setDataIndex: (state, { payload }) => {
            state.dataIndex = payload;
        }
    },
    extraReducers: {
        // Get Agent Type List Reducers
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

        // Get Agent Type List WITH ID Reducers
        [getAgentTypesWithIdList.pending]: (state) => {
            state.status = 'loading';
        },
        [getAgentTypesWithIdList.fulfilled]: (state, { payload }) => {
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
        [getAgentTypesWithIdList.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

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

export const { setDataIndex } = AgentTypeSlice.actions;

export default AgentTypeSlice.reducer;
