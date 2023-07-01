import * as httprequest from '~/utils/httprequest';

export const getProfile = async (nickname) => {
    try {
        const res = await httprequest.get(`users/@${nickname}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
