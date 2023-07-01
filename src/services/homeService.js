import * as httprequest from '~/utils/httprequest';

export const getVideoHome = async (type, page = 1) => {
    try {
        const res = await httprequest.get('videos', {
            params: {
                type,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
