import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

// CREATE MENU THUNK
export const createAgent = createAsyncThunk('agent/createAgent', async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}`, requestOptions).then((res) => res.json());
});

// GET MENU THUNK
export const getAgent = createAsyncThunk('agent/getAgent', async ({ pageno, limit, isActive }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit, ISACTIVE: isActive })
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// GET AGENT TYPES THUNK
export const getAgentTypeList = createAsyncThunk('agent/getAgentTypeList', async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}`, requestOptions).then((res) => res.json());
});

// GET AGENT LIST THUNK
export const getAgentList = createAsyncThunk('agent/getAgentList', async (id) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}${SubRoutes.AGENTLIST}/${id}`, requestOptions).then((res) => res.json());
});

// GET MENU THUNK
export const getPermissionsList = createAsyncThunk('agent/getPermissionsList', async ({ id }) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}/${id}`, requestOptions).then((res) => res.json());
});

// GET MENU THUNK
export const getGamesList = createAsyncThunk('agent/getGamesList', async ({ id }) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}${SubRoutes.GAMETYPE}/${id}`, requestOptions).then((res) => res.json());
});

// UPDATE MENU THUNK
export const updateAgent = createAsyncThunk('agent/updateAgent', async ({ data, id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}/${id}`, requestOptions).then((res) => res.json());
});

// DELETE AGENT TYPE THUNK
export const deleteAgent = createAsyncThunk('agent/deleteAgent', async ({ id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ MENU_ID: id })
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}/`, requestOptions).then((res) => res.json());
});
