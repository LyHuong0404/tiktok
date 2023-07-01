import * as httprequest from '~/utils/httprequest';

export const postVideo = async (formData) => {
    try {
        await httprequest.post('videos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteVideo = async (id) => {
    try {
        await httprequest.remove(`videos/${id}`);
    } catch (err) {
        console.log(err);
    }
};
