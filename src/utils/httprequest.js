import axios from 'axios';

const httprequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (apipath, params = {}) => {
    const response = await httprequest.get(apipath, params);
    return response.data;
};

export const post = async (apipath, data, params = {}) => {
    const response = await httprequest.post(apipath, data, params);
    return response.data;
};

export const patch = async (apipath, data, params = {}) => {
    const response = await httprequest.patch(apipath, data, params);
    return response.data;
};

export const remove = async (url, data, options = {}) => {
    const response = await httprequest.delete(url, data, options);
    return response.data;
};

httprequest.interceptors.request.use(function (config) {
    const token = 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.meta.token;
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default httprequest;
