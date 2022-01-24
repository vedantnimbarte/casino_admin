import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

// TODO: UPDATE KEYS FOR REQUEST BODY

// CREATE PERMISSIONS THUNK
export const createPermissions = createAsyncThunk('permissions/createPermissions', async ({ question, answer }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ QUESTION: question, ANSWER: answer })
    };
    return fetch(`${API_URL}${InternalAPI.PERMISSIONS}`, requestOptions).then((res) => res.json());
});

// GET PERMISSIONS THUNK
export const getPermissions = createAsyncThunk('permissions/getPermissions', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.PERMISSIONS}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE PERMISSIONS THUNK
export const updatePermissions = createAsyncThunk('permissions/updatePermissions', async ({ question, answer, id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ QUESTION: question, ANSWER: answer.length > 0 && answer })
    };
    return fetch(`${API_URL}${InternalAPI.PERMISSIONS}/${id}`, requestOptions).then((res) => res.json());
});

// DELETE PERMISSIONS THUNK
export const deletePermissions = createAsyncThunk('permissions/deletePermissions', async ({ id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ FAQ_ID: id })
    };
    return fetch(`${API_URL}${InternalAPI.PERMISSIONS}/`, requestOptions).then((res) => res.json());
});
