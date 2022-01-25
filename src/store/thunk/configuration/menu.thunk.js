import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

// CREATE MENU THUNK
export const createMenu = createAsyncThunk('menu/createMenu', async ({ name, slug }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ MENU_NAME: name, MENU_SLUG: slug })
    };
    return fetch(`${API_URL}${InternalAPI.MENU}`, requestOptions).then((res) => res.json());
});

// GET MENU THUNK
export const getMenu = createAsyncThunk('menu/getMenu', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.MENU}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE MENU THUNK
export const updateMenu = createAsyncThunk('menu/updateMenu', async ({ name, slug, id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ MENU_NAME: name, MENU_SLUG: slug })
    };
    return fetch(`${API_URL}${InternalAPI.MENU}/${id}`, requestOptions).then((res) => res.json());
});

// DELETE AGENT TYPE THUNK
export const deleteMenu = createAsyncThunk('menu/deleteMenu', async ({ id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ MENU_ID: id })
    };
    return fetch(`${API_URL}${InternalAPI.MENU}/`, requestOptions).then((res) => res.json());
});
