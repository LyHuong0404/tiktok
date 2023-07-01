import * as httprequest from '~/utils/httprequest';

export const likeComment = async (id) => {
    try {
        const response = await httprequest.post(`comments/${id}/like`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const unLikeComment = async (id) => {
    try {
        const response = await httprequest.post(`comments/${id}/unlike`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
