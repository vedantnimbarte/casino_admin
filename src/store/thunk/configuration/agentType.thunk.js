import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

// CREATE AGENT TYPE THUNK
export const createAgentType = createAsyncThunk('agent_type/createAgentType', async ({ name, parentRole, description }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ROLE_NAME: name, ROLE_PARENT_ID: parentRole })
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}`, requestOptions).then((res) => res.json());
});

// GET AGENT TYPE LIST THUNK
export const getAgentType = createAsyncThunk('agent_type/getAgentType', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE AGENT TYPE THUNK
export const updateAgentType = createAsyncThunk('agent_type/updateAgentType', async ({ name, parentRole, description, id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ROLE_NAME: name, ROLE_PARENT_ID: parentRole, DESCRIPTION: description.length > 0 && description })
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}/${id}`, requestOptions).then((res) => res.json());
});

// DELETE AGENT TYPE THUNK
export const deleteAgentType = createAsyncThunk('agent_type/deleteAgentType', async ({ id }) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}/${id}`, requestOptions).then((res) => res.json());
});
