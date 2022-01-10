import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI } from 'common/constants';
import { AgentType } from 'common/serializeData';

export const createAgentType = createAsyncThunk('agent_type/createAgentType', async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(AgentType(data))
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}`, requestOptions).then((res) => res.json());
});

export const dcreateAgentType = createAsyncThunk('agent_type/createAgentType', async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(AgentType(data))
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}`, requestOptions).then((res) => res.json());
});
