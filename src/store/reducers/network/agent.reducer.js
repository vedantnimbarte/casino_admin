import { createSlice } from '@reduxjs/toolkit';
import {
    getAgent,
    createAgent,
    updateAgent,
    deleteAgent,
    getAgentTypeList,
    getPermissionsList,
    getGamesList,
    getAgentList
} from 'store/thunk/network/agent.thunk';

const AgentSlice = createSlice({
    name: 'agent',
    initialState: {
        status: null,
        msg: '',
        totalRecords: 0,
        data: [],
        agentTypesList: [],
        permissionsList: [],
        gamesTypesList: [],
        agentsList: [],
        dataIndex: ''
    },
    reducers: {
        setDataIndex: (state, { payload }) => {
            state.dataIndex = payload;
        },
        clearAgentList: (state, { payload }) => {
            state.data.length = 0;
        },
        removeLastAgentType: (state, { payload }) => {
            if (typeof payload === 'number') {
                const parent = state.agentTypesList[payload].ROLE_PARENT_ID.split(',');
                if (parent[parent.length - 1] == 1) {
                    parent.pop();
                }
                state.agentTypesList[payload].ROLE_PARENT_ID = parent.toString();
            }
        }
    },
    extraReducers: {
        // Get Agent Type Reducers
        [getAgent.pending]: (state) => {
            state.status = 'loading';
        },
        [getAgent.fulfilled]: (state, { payload }) => {
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
        [getAgent.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Get Agent Type Reducers
        [getAgentTypeList.pending]: (state) => {
            state.status = 'loading';
        },
        [getAgentTypeList.fulfilled]: (state, { payload }) => {
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
        [getAgentTypeList.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Get Permissions List Reducers
        [getPermissionsList.pending]: (state) => {
            state.status = 'loading';
        },
        [getPermissionsList.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.permissionsList = payload.data;
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network Error';
                state.status = 'failed';
            }
        },
        [getPermissionsList.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Get Games List Reducers
        [getGamesList.pending]: (state) => {
            state.status = 'loading';
        },
        [getGamesList.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.gamesTypesList = payload.data;
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network Error';
                state.status = 'failed';
            }
        },
        [getGamesList.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Get Agents List Reducers
        [getAgentList.pending]: (state) => {
            state.status = 'loading';
        },
        [getAgentList.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.agentsList = payload.data;
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network Error';
                state.status = 'failed';
            }
        },
        [getAgentList.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Create Agent Type Reducers
        [createAgent.pending]: (state) => {
            state.status = 'loading';
        },
        [createAgent.fulfilled]: (state, { payload }) => {
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
        [createAgent.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Update Agent Type Reducers
        [updateAgent.pending]: (state) => {
            state.status = 'loading';
        },
        [updateAgent.fulfilled]: (state, { payload }) => {
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
        [updateAgent.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Delete Agent Type Reducers
        [deleteAgent.pending]: (state) => {
            state.status = 'loading';
        },
        [deleteAgent.fulfilled]: (state, { payload }) => {
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
        [deleteAgent.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        }
    }
});

export const { setDataIndex, clearAgentList, removeLastAgentType } = AgentSlice.actions;

export default AgentSlice.reducer;
