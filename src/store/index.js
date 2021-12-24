import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import reducer from './reducer';

// Reducers
import customizationReducer from './customizationReducer';
import userReducer from './userReducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

// const store = createStore(reducer);

export default configureStore({
    reducer: {
        customization: customizationReducer,
        user: userReducer
    }
});

// export default store;
