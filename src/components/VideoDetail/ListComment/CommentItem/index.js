import classNames from 'classnames/bind';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import handleLikeComment from '~/services/commentService';
import config from '~/config';
import Image from '~/components/Image';
import styles from '../Comment.module.scss';

const cx = classNames.bind(styles);

function CommentItem({ data, user }) {
    const [video, setVideo] = useState(data);

    const handleLikeCommentFunc = async () => {
        const isLike = await handleLikeComment(video);
        setVideo((prevVideo) => ({
            ...prevVideo,
            is_liked: isLike,
            likes_count: isLike ? prevVideo.likes_count + 1 : prevVideo.likes_count - 1,
        }));
    };
    return (
        <div className={cx('comment_content_container')}>
            <Link to={config.routes.profileLink(video.user.nickname)}>
                <Image src={video.user.avatar} alt={video.user.nickname} />
            </Link>
            <div className={cx('comment_container')}>
                <Link to={config.routes.profileLink(video.user.nickname)} className={cx('comment_nickname')}>
                    {video.user.nickname}
                </Link>
                <p className={cx('comment_text')}>{video.comment}</p>
                <p className={cx('created_at')}>{video.created_at}</p>
            </div>
            <div className={cx('action_container')}>
                <div className={cx('like_wrapper')} onClick={handleLikeCommentFunc}>
                    {video.is_liked ? (
                        <div className={cx('icon_comment_liked')}>
                            <FaHeart />
                        </div>
                    ) : (
                        <div className={cx('icon_comment')}>
                            <FaRegHeart />
                        </div>
                    )}
                    <span>{video.likes_count}</span>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
