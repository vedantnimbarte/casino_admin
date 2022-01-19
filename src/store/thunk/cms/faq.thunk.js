import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

// CREATE FAQ THUNK
export const createFAQ = createAsyncThunk('faq/createFAQ', async ({ question, answer }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ QUESTION: question, ANSWER: answer })
    };
    return fetch(`${API_URL}${InternalAPI.FAQ}`, requestOptions).then((res) => res.json());
});

// GET FAQ THUNK
export const getFAQ = createAsyncThunk('faq/getFAQ', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.FAQ}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE FAQ THUNK
export const updateFAQ = createAsyncThunk('faq/updateFAQ', async ({ question, answer, id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ QUESTION: question, ANSWER: answer.length > 0 && answer })
    };
    return fetch(`${API_URL}${InternalAPI.FAQ}/${id}`, requestOptions).then((res) => res.json());
});

// DELETE FAQ THUNK
export const deleteFAQ = createAsyncThunk('faq/deleteFAQ', async ({ id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ FAQ_ID: id })
    };
    return fetch(`${API_URL}${InternalAPI.FAQ}/`, requestOptions).then((res) => res.json());
});
