import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import config from '~/config';
import styles from './FollowingNoLogin.module.scss';
import * as homeService from '~/services/homeService';
import Button from '~/components/Button';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function FollowingNoLogin() {
    const [listVideo, setListVideo] = useState([]);

    const handleVideoPlay = (e) => {
        e.target.play();
    };

    const handleVideoPause = (e) => {
        e.target.pause();
        e.target.currentTime = 0;
    };
    useEffect(() => {
        const getListVideo = async () => {
            const result = await homeService.getVideoHome('for-you');

            setListVideo(result);
        };

        getListVideo();
    }, []);
    return (
        <div className={cx('list_video_wrapper')}>
            <div className={cx('list_video_container')}>
                {listVideo?.map((video) => (
                    <Link key={video.id} to={config.routes.profileLink(video.user.nickname)}>
                        <div className={cx('video_container')}>
                            <video
                                className={cx('video')}
                                src={video.file_url}
                                muted
                                loop
                                onMouseEnter={handleVideoPlay}
                                onMouseLeave={handleVideoPause}
                                poster={video.thumb_url}
                            />
                            <div className={cx('video_user')}>
                                <Image className={cx('avatar')} src={video.user.avatar} alt={video.user.nickname} />
                                <span className={cx('nickname')}>{video.user.nickname}</span>
                                <Button
                                    primary
                                    className={cx('video_button')}
                                    onClick={() =>
                                        alert('Please log in to follow creators, like videos, and view comments.')
                                    }
                                >
                                    Follow
                                </Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default FollowingNoLogin;
