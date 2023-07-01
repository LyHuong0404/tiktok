import * as httprequest from '~/utils/httprequest';

export const getVideoDetail = async (id) => {
    try {
        const res = await httprequest.get(`videos/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getListComment = async (id) => {
    try {
        const res = await httprequest.get(`videos/${id}/comments`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const postComment = async (id, comment) => {
    try {
        const res = await httprequest.post(`videos/${id}/comments`, comment);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
