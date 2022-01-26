import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

// TODO: UPDATE KEYS FOR REQUEST BODY

// CREATE PERMISSIONS THUNK
export const createMenuPermissions = createAsyncThunk('menu_permissions/createMenuPermissions', async ({ question, answer }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ QUESTION: question, ANSWER: answer })
    };
    return fetch(`${API_URL}${InternalAPI.MENUPERMISSIONS}`, requestOptions).then((res) => res.json());
});

// GET PERMISSIONS THUNK
export const getMenuPermissions = createAsyncThunk('menu_permissions/getMenuPermissions', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.MENUPERMISSIONS}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE PERMISSIONS THUNK
export const updateMenuPermissions = createAsyncThunk('menu_permissions/updateMenuPermissions', async ({ question, answer, id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ QUESTION: question, ANSWER: answer.length > 0 && answer })
    };
    return fetch(`${API_URL}${InternalAPI.MENUPERMISSIONS}/${id}`, requestOptions).then((res) => res.json());
});

// DELETE PERMISSIONS THUNK
export const deleteMenuPermissions = createAsyncThunk('menu_permissions/deleteMenuPermissions', async ({ id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ FAQ_ID: id })
    };
    return fetch(`${API_URL}${InternalAPI.MENUPERMISSIONS}/`, requestOptions).then((res) => res.json());
});