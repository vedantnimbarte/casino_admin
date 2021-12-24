import { createSlice } from '@reduxjs/toolkit';

import { configurationMenuItems } from './submenu-items';

const userReducer = createSlice({
    name: 'user',
    initialState: {
        name: 'Vedant Nimbarte',
        email: 'vedant.mountgames@gmail.com',
        role: 'ADMIN',
        allowedRoutes: ['/dashboard', '/notification', '/faq']
    }
});

export default userReducer.reducer;
