import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from '~/services/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

setupListeners(store.dispatch);
