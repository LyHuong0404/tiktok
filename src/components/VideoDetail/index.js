import React, { memo } from 'react';
import { IoClose } from 'react-icons/io5';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './VideoDetail.module.scss';
import Video from './Video';
import ListComment from './ListComment';

const cx = classNames.bind(styles);

function VideoDetail({ data }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (location.state.prevPath) {
            return navigate(-1);
        } else navigate('/');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('close_button')} onClick={handleGoBack}>
                <IoClose />
            </div>
            <div className={cx('video_container')}>
                <img className={cx('blur')} src={data.thumb_url} alt={data.description} />
                <div className={cx('video_wrapper')}>
                    <div className={cx('video')}>
                        <Video data={data} />
                    </div>
                </div>
            </div>
            <ListComment video={data} />
        </div>
    );
}

export default memo(VideoDetail);
