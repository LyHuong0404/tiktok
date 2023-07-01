import * as httprequest from '~/utils/httprequest';
import config from '~/config';

export const register = async ({ type, email, password }) => {
    const response = await httprequest.post(config.authRoutes.register, { type, email, password });
    return response;
};

export const login = async ({ email, password }) => {
    const response = await httprequest.post(config.authRoutes.login, { email, password });
    return response;
};

export const logout = async () => {
    await httprequest.post(config.authRoutes.logout);
};

export const getCurrentUser = async () => {
    const response = await httprequest.get(config.authRoutes.me);
    return response.data;
};
