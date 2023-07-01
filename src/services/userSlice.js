import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userLogout, userRegister } from './userService';

// initialize TOKEN from local storage
const userJson = localStorage.getItem('user');
const user = JSON.parse(userJson)?.data || null;
const token = JSON.parse(userJson)?.meta.token || null;

const initialState = {
    loading: false,
    user: user,
    token: token,
    error: null,
    success: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Register user
        builder
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userRegister.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
                state.success = true;
                state.token = payload.token;
            })
            .addCase(userRegister.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            // Login user
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
                state.token = payload.token;
            })
            .addCase(userLogin.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.error = null;
            });
    },
});
export default userSlice.reducer;
export const { logout } = userSlice.actions;
