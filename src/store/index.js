import { configureStore } from '@reduxjs/toolkit';

// Reducers
import customizationReducer from './customizationReducer';
import userReducer from './reducers/userReducer';
import agentTypeReducer from './reducers/configuration/agentType.reducer';
import gameTypeReducer from './reducers/configuration/gameType.reducer';
import faqReducer from './reducers/cms/faq.reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

export default configureStore({
    reducer: {
        customization: customizationReducer,
        user: userReducer,
        agentType: agentTypeReducer,
        gameType: gameTypeReducer,
        faq: faqReducer
    }
});

// export default store;
