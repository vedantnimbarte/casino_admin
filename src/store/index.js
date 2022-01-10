import { configureStore } from '@reduxjs/toolkit';

// Reducers
import customizationReducer from './customizationReducer';
import userReducer from './reducers/userReducer';
import agentTypeReducer from './reducers/configuration/agentType.reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

export default configureStore({
    reducer: {
        customization: customizationReducer,
        user: userReducer,
        agentType: agentTypeReducer
    }
});

// export default store;
