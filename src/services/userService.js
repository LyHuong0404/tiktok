import { createAsyncThunk } from '@reduxjs/toolkit';

import * as httprequest from '~/utils/httprequest';
import * as authServices from './authentication/authServices';
import config from '~/config';

export const userRegister = createAsyncThunk(
    config.authRoutes.register,
    async ({ type, email, password }, { rejectWithValue }) => {
        try {
            const res = await authServices.register({ type, email, password });
            res && localStorage.setItem('user', JSON.stringify(res));
            return res.data;
        } catch (error) {
            if (error.message) {
                return rejectWithValue(error.message);
            }
        }
    },
);
export const userLogin = createAsyncThunk(config.authRoutes.login, async ({ email, password }, { rejectWithValue }) => {
    try {
        const res = await authServices.login({ email, password });
        res && localStorage.setItem('user', JSON.stringify(res));
        return res.data;
    } catch (error) {
        if (error.message) {
            return rejectWithValue(error.message);
        }
    }
});
export const userLogout = createAsyncThunk(config.authRoutes.logout, async () => {
    await authServices.logout();
    localStorage.removeItem('user');
    window.location.reload();
});

export const updateProfile = async (formData, _method) => {
    try {
        await httprequest.post('auth/me', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: { _method: 'PATCH' },
        });
    } catch (err) {
        console.log(err);
    }
};
