import * as likeServices from './authentication/likeServices';

const handleLike = async (video) => {
    let newVideo;

    if (video && video.is_liked) {
        newVideo = await likeServices.unlike(video.id);
    } else {
        newVideo = await likeServices.like(video.id);
    }
    return newVideo && newVideo.is_liked;
};

export default handleLike;
