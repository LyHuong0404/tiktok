import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FaCommentDots, FaMusic, FaShare } from 'react-icons/fa';
import { IoHeart } from 'react-icons/io5';
import { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SHARE_MENU } from '~/components/Menu';
import Menu from '~/components/Popper/Menu';
import LoginDialog from '~/components/LoginDialog';
import likeService from '~/services/likeService';
import config from '~/config';
import handleFollow from '~/services/followService';
import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './Video.module.scss';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Video({ data }) {
    const { user: userRedux } = useSelector((state) => state.user);
    const [video, setVideo] = useState(data);
    const [user, setUser] = useState(video.user);
    const location = useLocation();

    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

    useEffect(() => {
        setUser(video.user);
        setVideo(video);
    }, [video]);

    const handleFollowFunc = async () => {
        const isFollow = await handleFollow(user);
        setUser((user) => ({ ...user, is_followed: isFollow }));
        setVideo((prevVideo) => ({ ...prevVideo, user: { ...prevVideo.user, is_followed: isFollow } }));
    };

    const handleLikeFunc = async () => {
        const isLike = await likeService(video);
        setVideo((prevVideo) => ({
            ...prevVideo,
            is_liked: isLike,
            likes_count: isLike ? prevVideo.likes_count + 1 : prevVideo.likes_count - 1,
        }));
    };

    const handleShareFunc = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            video.file_url,
        )}&quote=${encodeURIComponent(video.description)}`;

        window.open(shareUrl, '_blank');
        setVideo((prevVideo) => ({ ...prevVideo, shares_count: prevVideo.shares_count + 1 }));
    };

    const handleCopyFunc = () => {
        const copyText = video.file_url;
        navigator.clipboard
            .writeText(copyText)
            .then(() => {
                toast.success('Video link copied to clipboard');
            })
            .catch((error) => {
                console.error('Error copying video link:', error);
            });
        setVideo((prevVideo) => ({ ...prevVideo, shares_count: prevVideo.shares_count + 1 }));
    };

    const handleMenuChange = (menuItem) => {
        switch (menuItem.to) {
            case '/facebook':
                handleShareFunc();
                break;
            case '/copy':
                handleCopyFunc();
                break;
            default:
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('avatar')} src={video.user.avatar} alt={video.user.nickname} />
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <Link to={config.routes.profileLink(user.nickname)} className={cx('name')}>
                        <p className={cx('nickname')}>{video.user.nickname}</p>
                        {video.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        <p className={cx('fullname')}>{`${video.user.first_name} ${video.user.last_name}`}</p>
                    </Link>
                    <span className={cx('description-video')}>{video.description}</span>
                    <p className={cx('music')}>
                        <FaMusic className={cx('icon-music')} />
                        {video.music ? `nhạc nền - ${video.music}` : 'nhạc nền - Chưa cập nhật'}
                    </p>
                </div>

                <Link
                    to={config.routes.videoLink(video.id)}
                    state={{
                        videoDetail: true,
                        video: video,
                        prevPath: location.pathname,
                    }}
                >
                    <div className={cx('video-container')}>
                        <video className={cx('video')} src={video.file_url} controls></video>
                    </div>
                </Link>
            </div>
            <div>
                {userRedux ? (
                    userRedux.id !== video.user_id ? (
                        <div onClick={handleFollowFunc}>
                            <Button outline className={cx('follow-btn')}>
                                {video.user.is_followed ? 'Following' : 'Follow'}
                            </Button>
                        </div>
                    ) : (
                        <Button disabled className={cx('follow-btn')}></Button>
                    )
                ) : (
                    <Button
                        outline
                        className={cx('follow-btn')}
                        onClick={() => setIsLoginDialogOpen(!isLoginDialogOpen)}
                    >
                        Follow
                    </Button>
                )}
                {isLoginDialogOpen && <LoginDialog onClose={() => setIsLoginDialogOpen(!isLoginDialogOpen)} />}
                <div className={cx('action-menu')}>
                    {userRedux ? (
                        <>
                            <div onClick={handleLikeFunc}>
                                <Button circle className={cx('action-btn')}>
                                    <IoHeart className={video.is_liked ? `${cx('icon-like')}` : `${cx('icon')}`} />
                                </Button>
                                <p className={cx('amount')}>{video.likes_count}</p>
                            </div>
                            <div>
                                <Link
                                    to={config.routes.videoLink(video.id)}
                                    state={{
                                        videoDetail: true,
                                        video: video,
                                        prevPath: location.pathname,
                                    }}
                                >
                                    <Button circle className={cx('action-btn')}>
                                        <FaCommentDots className={cx('icon-comment')} />
                                    </Button>
                                    <p className={cx('amount')}>{video.comments_count}</p>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div onClick={() => setIsLoginDialogOpen(!isLoginDialogOpen)}>
                            <div>
                                <Button circle className={cx('action-btn')}>
                                    <IoHeart className={video.is_liked ? `${cx('icon-like')}` : `${cx('icon')}`} />
                                </Button>
                                <p className={cx('amount')}>{video.likes_count}</p>
                            </div>
                            <div>
                                <Button circle className={cx('action-btn')}>
                                    <FaCommentDots className={cx('icon-comment')} />
                                </Button>
                                <p className={cx('amount')}>{video.comments_count}</p>
                            </div>
                        </div>
                    )}
                    <Menu popperShare items={SHARE_MENU} onChange={handleMenuChange}>
                        <div>
                            <Button circle className={cx('action-btn')}>
                                <FaShare />
                            </Button>
                            <p className={cx('amount')}>{video.shares_count}</p>
                        </div>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default memo(Video);
