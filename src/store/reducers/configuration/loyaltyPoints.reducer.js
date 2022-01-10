import { createSlice } from '@reduxjs/toolkit';

const LoyaltyPointsSlice = createSlice({
    name: 'loyalty_points',
    initialState: {
        loading: false,
        error: false,
        errorMsg: '',
        data: []
    },
    reducers: {
        defaultState(state) {
            return { ...state, error: false, loading: false };
        },
        createLoyaltyPoint(state, { payload }) {
            return { ...state, ...payload };
        }
    }
});

export const { createLoyaltyPoint, defaultState } = LoyaltyPointsSlice.actions;
export default LoyaltyPointsSlice.reducer;
