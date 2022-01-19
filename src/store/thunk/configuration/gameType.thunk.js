import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

// CREATE GAME TYPE THUNK
export const createGameType = createAsyncThunk('game_type/createGameType', async ({ name, description }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ GAMEGROUP_NAME: name, DESCRIPTION: description })
    };
    return fetch(`${API_URL}${InternalAPI.GAMEGROUP}`, requestOptions).then((res) => res.json());
});

// GET GAME TYPES THUNK
export const getGameType = createAsyncThunk('game_type/getGameType', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.GAMEGROUP}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE GAME TYPE THUNK
export const updateGameType = createAsyncThunk('game_type/updateGameType', async ({ name, parentRole, description, id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ GAMEGROUP_NAME: name, DESCRIPTION: description.length > 0 && description })
    };
    return fetch(`${API_URL}${InternalAPI.GAMEGROUP}/${id}`, requestOptions).then((res) => res.json());
});

// DELETE GAME TYPE THUNK
export const deleteGameType = createAsyncThunk('game_type/deleteGameType', async ({ id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ GAMEGROUP_ID: id })
    };
    return fetch(`${API_URL}${InternalAPI.GAMEGROUP}/`, requestOptions).then((res) => res.json());
});
