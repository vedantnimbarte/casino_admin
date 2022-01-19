import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

// GET SETTINGS THUNK
export const getSettingsData = createAsyncThunk('settings/getSettings', async (pageTitle) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ PAGETITLE: pageTitle })
    };
    return fetch(`${API_URL}${InternalAPI.SETTINGS}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE SETTINGS THUNK
export const updateSettings = createAsyncThunk('settings/updateSettings', async ({ title, description, pageTitle, id }) => {
    if(id) {
        const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ TITLE: title, DESCRIPTION: description.length > 0 && description, PAGETITLE: pageTitle })
    };
    return fetch(`${API_URL}${InternalAPI.SETTINGS}/${id}`, requestOptions).then((res) => res.json());
    }
});
