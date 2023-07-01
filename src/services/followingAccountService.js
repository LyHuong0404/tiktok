import * as httprequest from '~/utils/httprequest';

export const listFollowingAccount = async (page) => {
    try {
        const res = await httprequest.get('me/followings', {
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
