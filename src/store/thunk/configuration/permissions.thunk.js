import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

// TODO: UPDATE KEYS FOR REQUEST BODY

// GET PERMISSIONS THUNK
export const getPermissions = createAsyncThunk('permissions/getPermissions', async ({ roleid, pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ROLE_ID: roleid, pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.PERMISSIONS}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE PERMISSIONS THUNK
export const updatePermissions = createAsyncThunk('permissions/updatePermissions', async ({ permissionId, isView }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ISVIEW: isView
        })
    };
    return fetch(`${API_URL}${InternalAPI.PERMISSIONS}/${permissionId}`, requestOptions).then((res) => res.json());
});
