import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

// CREATE GAME TYPE THUNK
export const createGamePack = createAsyncThunk('game_type/createGamePack', async ({ name, description }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ GAMEGROUP_NAME: name, DESCRIPTION: description })
    };
    return fetch(`${API_URL}${InternalAPI.GAMEPACK}`, requestOptions).then((res) => res.json());
});

// GET GAME TYPES THUNK
export const getGamePack = createAsyncThunk('game_pack/getGamePack', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.GAMEPACK}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE GAME TYPE THUNK
export const updateGamePack = createAsyncThunk('game_pack/updateGamePack', async ({ name, description, id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ GAMEGROUP_NAME: name, DESCRIPTION: description.length > 0 && description })
    };
    return fetch(`${API_URL}${InternalAPI.GAMEPACK}/${id}`, requestOptions).then((res) => res.json());
});

// DELETE GAME TYPE THUNK
export const deleteGamePack = createAsyncThunk('game_pack/deleteGamePack', async ({ id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ GAMEGROUP_ID: id })
    };
    return fetch(`${API_URL}${InternalAPI.GAMEPACK}/`, requestOptions).then((res) => res.json());
});
