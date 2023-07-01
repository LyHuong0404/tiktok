import * as httprequest from '~/utils/httprequest';

export const getSuggestedAccount = async (page, perPage) => {
    try {
        const res = await httprequest.get('users/suggested', {
            params: {
                page,
                per_page: perPage,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
