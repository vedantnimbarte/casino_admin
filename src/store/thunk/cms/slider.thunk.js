import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

// TODO: UPDATE KEYS FOR REQUEST BODY

// CREATE Slider THUNK
export const createSlider = createAsyncThunk('slider/createSlider', async ({ question, answer }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ QUESTION: question, ANSWER: answer })
    };
    return fetch(`${API_URL}${InternalAPI.SLIDER}`, requestOptions).then((res) => res.json());
});

// GET Slider THUNK
export const getSlider = createAsyncThunk('slider/getSlider', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.SLIDER}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE Slider THUNK
export const updateSlider = createAsyncThunk('slider/updateSlider', async ({ question, answer, id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ QUESTION: question, ANSWER: answer.length > 0 && answer })
    };
    return fetch(`${API_URL}${InternalAPI.SLIDER}/${id}`, requestOptions).then((res) => res.json());
});

// DELETE Slider THUNK
export const deleteSlider = createAsyncThunk('slider/deleteSlider', async ({ id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ FAQ_ID: id })
    };
    return fetch(`${API_URL}${InternalAPI.SLIDER}/`, requestOptions).then((res) => res.json());
});
