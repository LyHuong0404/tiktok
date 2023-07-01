import * as followServices from './authentication/followServices';

const handleFollow = async (user) => {
    let newUser;

    if (user && user.is_followed) {
        newUser = await followServices.unfollow(user.id);
    } else {
        newUser = await followServices.follow(user.id);
    }
    return newUser && newUser.is_followed;
};

export default handleFollow;
