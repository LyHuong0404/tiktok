import * as httprequest from '~/utils/httprequest';

export const like = async (id) => {
    try {
        const response = await httprequest.post(`videos/${id}/like`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const unlike = async (id) => {
    try {
        const response = await httprequest.post(`videos/${id}/unlike`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
