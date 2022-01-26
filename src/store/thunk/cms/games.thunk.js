import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

// TODO: UPDATE KEYS FOR REQUEST BODY

// CREATE Games THUNK
export const createGames = createAsyncThunk('games/createGames', async (gameData) => {
    const requestOptions = {
        method: 'POST',
        // headers: {
        //     'content-type': 'multipart/form-data;boundary=fjdslkfjlsj'
        // },
        body: gameData
    };
    return fetch(`${API_URL}${InternalAPI.GAMES}`, requestOptions).then((res) => res.json());
});

// GET Games THUNK
export const getGames = createAsyncThunk('games/getGames', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.GAMES}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE Games THUNK
export const updateGames = createAsyncThunk('games/updateGames', async ({ data, id, isFile }) => {
    if (!isFile) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        return fetch(`${API_URL}${InternalAPI.GAMES}/${id}`, requestOptions).then((res) => res.json());
    } else {
        const requestOptions = {
            method: 'PUT',
            body: data
        };

        return fetch(`${API_URL}${InternalAPI.GAMES}${SubRoutes.FILE}/${id}`, requestOptions).then((res) => res.json());
    }
});

// DELETE Games THUNK
export const deleteGames = createAsyncThunk('games/deleteGames', async ({ id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ GAME_ID: id })
    };
    return fetch(`${API_URL}${InternalAPI.GAMES}/`, requestOptions).then((res) => res.json());
});
