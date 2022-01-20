import { configureStore } from '@reduxjs/toolkit';

// Reducers
import customizationReducer from './customizationReducer';
import userReducer from './reducers/userReducer';
import agentTypeReducer from './reducers/configuration/agentType.reducer';
import gameTypeReducer from './reducers/configuration/gameType.reducer';
import faqReducer from './reducers/cms/faq.reducer';
import coinPackReducer from './reducers/configuration/coinPack.reducer';
import settingsReducer from './reducers/configuration/settings.reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

export default configureStore({
    reducer: {
        customization: customizationReducer,
        user: userReducer,
        agentType: agentTypeReducer,
        gameType: gameTypeReducer,
        faq: faqReducer,
        coinPack: coinPackReducer,
        settings: settingsReducer
    }
});

// export default store;
