import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

// CREATE MENU THUNK
export const createAgent = createAsyncThunk('agent/createAgent', async ({ name, slug }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ MENU_NAME: name, MENU_SLUG: slug })
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}`, requestOptions).then((res) => res.json());
});

// GET MENU THUNK
export const getAgent = createAsyncThunk('agent/getAgent', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE MENU THUNK
export const updateAgent = createAsyncThunk('agent/updateAgent', async ({ name, slug, id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ MENU_NAME: name, MENU_SLUG: slug })
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