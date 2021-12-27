import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
    name: 'user',
    initialState: {
        name: 'Vedant Nimbarte',
        email: 'vedant.mountgames@gmail.com',
        role: 'ADMIN',
        allowedRoutes: [
            '/dashboard',
            '/notification',
            '/faq',
            '/terms-conditions',
            'privacy-policy',
            '/disclaimer',
            '/about',
            '/payment-terms',
            '/game',
            '/game-group',
            '/roles',
            '/slider'
        ]
    }
});

export default userReducer.reducer;
