import * as commentServices from './authentication/commentServices';

const handleLikeComment = async (video) => {
    let newUser;

    if (video && video.is_liked) {
        newUser = await commentServices.unLikeComment(video.id);
    } else {
        newUser = await commentServices.likeComment(video.id);
    }
    return newUser && newUser.is_liked;
};

export default handleLikeComment;
