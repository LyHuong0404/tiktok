import * as httprequest from '~/utils/httprequest';

export const follow = async (id) => {
    try {
        const response = await httprequest.post(`users/${id}/follow`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const unfollow = async (id) => {
    try {
        const response = await httprequest.post(`users/${id}/unfollow`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
