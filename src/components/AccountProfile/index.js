import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import LoginDialog from '~/components/LoginDialog';
import config from '~/config';
import handleFollow from '~/services/followService';
import * as profileService from '~/services/profileService';
import Button from '~/components/Button';
import styles from './AccountProfile.module.scss';
import Image from '~/components/Image';
import { FaRegEdit } from 'react-icons/fa';
import EditProfileDialog from '~/components/EditProfileDialog';
import LoadMore from '~/components/LoadMore';

const cx = classNames.bind(styles);

function AccountProfile() {
    const { user: userRedux } = useSelector((state) => state.user);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const location = useLocation();
    const params = useParams();
    const nickname = params.nickname;

    useEffect(() => {
        const fetchApi = async () => {
            const result = await profileService.getProfile(nickname);
            setUser(result);
            setLoading(false);
            window.scrollTo(0, 0);
        };
        fetchApi();
    }, [nickname, user.is_followed]); //user.is_followed là depedence để cập nhật lại số lượng analysis

    const handleVideoPlay = (e) => {
        e.target.play();
    };

    const handleVideoPause = (e) => {
        e.target.pause();
        e.target.currentTime = 0;
    };

    const handleFollowFunc = async () => {
        const isFollow = await handleFollow(user);
        setUser((user) => ({ ...user, is_followed: isFollow }));
    };

    if (loading) {
        return <LoadMore />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <Image src={user.avatar} width={116} height={116} className={cx('avatar')} />

                    <div className={cx('title_container')}>
                        <h2 className={cx('user_title')}>
                            {user.nickname}{' '}
                            {user.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </h2>

                        <h4 className={cx('user_fullname')}>
                            {user.first_name} {user.last_name}
                        </h4>

                        {userRedux?.id === user?.id ? (
                            <div>
                                <Button
                                    className={cx('button-edit')}
                                    rectangle
                                    leftIcon={<FaRegEdit />}
                                    onClick={() => setEditProfileOpen(!editProfileOpen)}
                                >
                                    Edit Profile
                                </Button>
                                {editProfileOpen && <EditProfileDialog />}
                            </div>
                        ) : userRedux ? (
                            <Button primary className={cx('button-follow')} onClick={handleFollowFunc}>
                                {user?.is_followed ? 'Following' : 'Follow'}
                            </Button>
                        ) : (
                            <Button
                                primary
                                className={cx('button-follow')}
                                onClick={() => setIsLoginDialogOpen(!isLoginDialogOpen)}
                            >
                                {user?.is_followed ? 'Following' : 'Follow'}
                            </Button>
                        )}
                    </div>
                </div>

                <h2 className={cx('count_info')}>
                    <div className={cx('number_container')}>
                        <strong>{user.followings_count}</strong>
                        <span>Followings</span>
                    </div>
                    <div className={cx('number_container')}>
                        <strong>{user.followers_count}</strong>
                        <span>Follower</span>
                    </div>
                    <div className={cx('number_container')}>
                        <strong>{user.likes_count}</strong>
                        <span>Likes</span>
                    </div>
                </h2>
                <h2 className={cx('bio')}>{user.bio || 'No bio yet.'}</h2>
            </div>
            <div className={cx('list_video_wrapper')}>
                <div className={cx('title_wrapper')}>
                    <p className={cx('title')}>Videos</p>
                    <p className={cx('title')}>Liked</p>
                </div>
                <div className={cx('list_video_container')}>
                    <div className={cx('list_video')}>
                        {user?.videos?.map((video) => (
                            <Link
                                key={video.id}
                                to={config.routes.videoLink(video.id)}
                                state={{
                                    videoDetail: true,
                                    video: video,
                                    prevPath: location.pathname,
                                }}
                            >
                                <div className={cx('video_container')}>
                                    <video
                                        src={video.file_url}
                                        muted
                                        loop
                                        onMouseEnter={handleVideoPlay}
                                        onMouseLeave={handleVideoPause}
                                        poster={video.thumb_url}
                                    />
                                    <div className={cx('video_desc')}>
                                        <p>{video.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {isLoginDialogOpen && <LoginDialog onClose={() => setIsLoginDialogOpen(!isLoginDialogOpen)} />}
                </div>
            </div>
        </div>
    );
}

export default AccountProfile;
