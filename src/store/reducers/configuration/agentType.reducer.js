import { createSlice } from '@reduxjs/toolkit';
import { createAgentType } from 'store/thunk/configuration/agentType.thunk';

const AgentTypeSlice = createSlice({
    name: 'agent_type',
    initialState: {
        status: null,
        errorMsg: '',
        data: []
    },
    extraReducers: {
        // Create Agent Type Reducers
        [createAgentType.pending]: (state) => {
            state.status = 'loading';
        },
        [createAgentType.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.data = payload;
                state.status = 'success';
            } else {
                state.data = payload.message;
                state.status = 'failed';
            }
        },
        [createAgentType.rejected]: (state, { payload }) => {
            state.data = payload;
            state.status = 'failed';
            state.errorMsg = 'Something went wrong. Please try again.';
        }
    }
});

export default AgentTypeSlice.reducer;
