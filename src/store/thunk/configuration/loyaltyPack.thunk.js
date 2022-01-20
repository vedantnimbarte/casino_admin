import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

// CREATE GAME TYPE THUNK
export const createLoyaltyPack = createAsyncThunk('loyalty_pack/createLoyaltyPack', async ({ level, pointsNeeded, multiplier }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            LOYALTY_NAME: level,
            LOYALTY_POINTS: pointsNeeded,
            LOYALTY_MULTIPLIER: multiplier
        })
    };
    return fetch(`${API_URL}${InternalAPI.LOYALTYPACK}`, requestOptions).then((res) => res.json());
});

// GET GAME TYPES THUNK
export const getLoyaltyPack = createAsyncThunk('loyalty_pack/getLoyaltyPack', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.LOYALTYPACK}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE GAME TYPE THUNK
export const updateLoyaltyPack = createAsyncThunk('loyalty_pack/updateLoyaltyPack', async ({ level, pointsNeeded, multiplier, id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            LOYALTY_NAME: level,
            LOYALTY_POINTS: pointsNeeded,
            LOYALTY_MULTIPLIER: multiplier
        })
    };
    return fetch(`${API_URL}${InternalAPI.LOYALTYPACK}/${id}`, requestOptions).then((res) => res.json());
});

// DELETE GAME TYPE THUNK
export const deleteLoyaltyPack = createAsyncThunk('loyalty_pack/deleteLoyaltyPack', async ({ id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ LOYALTY_ID: id })
    };
    return fetch(`${API_URL}${InternalAPI.LOYALTYPACK}/`, requestOptions).then((res) => res.json());
});
