import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
    name: 'user',
    initialState: {
        name: 'Pabelo',
        email: 'pabelo@email.com',
        role: 'ADMIN',
        allowedRoutes: [
            '/dashboard',
            '/cms/notification',
            '/cms/faq',
            '/cms/terms-conditions',
            '/cms/privacy-policy',
            '/cms/disclaimer',
            '/cms/about',
            '/cms/payment-terms',
            '/cms/game',
            '/cms/game-group',
            '/cms/slider',
            '/configuration/roles',
            '/configuration/permissions',
            '/configuration/commission',
            '/player',
            '/network/agent-tree',
            '/transaction',
            '/network/agents'
        ]
    }
});

export default userReducer.reducer;
