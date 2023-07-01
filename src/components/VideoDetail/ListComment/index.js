import classNames from 'classnames/bind';
import { FaCommentDots, FaMusic, FaShare } from 'react-icons/fa';
import { IoHeart } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import handleFollow from '~/services/followService';
import likeService from '~/services/likeService';
import config from '~/config';
import DeleteDialog from '~/components/DeleteDialog';
import LoadMore from '~/components/LoadMore';
import * as videoDetailService from '~/services/videoDetailService';
import LoginDialog from '~/components/LoginDialog';
import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './Comment.module.scss';
import CommentItem from './CommentItem';

const cx = classNames.bind(styles);

function ListComment({ video }) {
    const { user: userRedux } = useSelector((state) => state.user);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [user, setUser] = useState(video.user);
    const [videoAction, setVideoAction] = useState(video);
    const [listComment, setListComment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchApi = async () => {
            const result = await videoDetailService.getListComment(video.id);
            setListComment(result);
            setLoading(false);
        };

        fetchApi();
    }, [video, userRedux]);

    // useEffect(() => {
    //     setUser(videoAction.user);

    //     setVideoAction(videoAction);
    // }, [videoAction]);

    const handleFollowFunc = async () => {
        const isFollow = await handleFollow(user);
        setUser((user) => ({ ...user, is_followed: isFollow }));
        setVideoAction((prevVideo) => ({ ...prevVideo, user: { ...prevVideo.user, is_followed: isFollow } }));
    };

    const handleLikeFunc = async () => {
        const isLike = await likeService(videoAction);
        setVideoAction((prevVideo) => ({
            ...prevVideo,
            is_liked: isLike,
            likes_count: isLike ? prevVideo.likes_count + 1 : prevVideo.likes_count - 1,
        }));
    };

    const handleComment = async () => {
        const result = await videoDetailService.postComment(video.id, {
            comment: comment,
        });
        setComment('');
        setListComment((prev) => [result, ...prev]);
        setVideoAction((prevVideo) => ({
            ...prevVideo,
            comments_count: prevVideo.comments_count + 1,
        }));
        setLoading(false);
    };
    const onFormSubmit = (e) => {
        e.preventDefault();
        handleComment();
    };

    return (
        <div className={cx('content_container')}>
            <div className={cx('user')}>
                <div className={cx('user_info')}>
                    <Image className={cx('avatar')} src={videoAction.user.avatar} alt={videoAction.user.nickname} />
                    <div className={cx('name')}>
                        <Link to={config.routes.profileLink(videoAction.user.nickname)}>
                            <p className={cx('nickname')}>
                                <strong>{videoAction.user.nickname}</strong>

                                {videoAction.user.tick && (
                                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                                )}
                            </p>
                        </Link>

                        <p
                            className={cx('full_name')}
                        >{`${videoAction.user.first_name} ${videoAction.user.last_name}`}</p>
                    </div>

                    {videoAction?.user_id !== userRedux?.id ? (
                        userRedux ? (
                            <Button className={cx('follow_btn')} outline onClick={handleFollowFunc}>
                                {videoAction.user.is_followed ? 'Following' : ' Follow'}
                            </Button>
                        ) : (
                            <Button className={cx('follow_btn')} outline onClick={() => setIsDialogOpen(!isDialogOpen)}>
                                Follow
                            </Button>
                        )
                    ) : (
                        <>
                            <Button className={cx('follow_btn')} primary onClick={() => setIsDialogOpen(!isDialogOpen)}>
                                Delete Video
                            </Button>
                            {isDialogOpen && (
                                <DeleteDialog video={videoAction} onClose={() => setIsDialogOpen(!isDialogOpen)} />
                            )}
                        </>
                    )}
                </div>
                <p className={cx('description_video')}>{videoAction.description}</p>
                <div className={cx('music')}>
                    <p>
                        <FaMusic className={cx('icon_music')} />
                        {videoAction.music ? `nhạc nền - ${videoAction.music}` : 'nhạc nền - Chưa cập nhật'}
                    </p>
                </div>
                <div className={cx('analysis')}>
                    {userRedux ? (
                        <div className={cx('item')} onClick={handleLikeFunc}>
                            <button className={cx('action_btn_like')}>
                                <IoHeart
                                    className={videoAction.is_liked ? `${cx('icon_liked')}` : `${cx('icon_like')}`}
                                />
                            </button>
                            <p className={cx('amount')}>{videoAction.likes_count}</p>
                        </div>
                    ) : (
                        <div className={cx('item')} onClick={() => setIsDialogOpen(!isDialogOpen)}>
                            <button className={cx('action_btn_like')}>
                                <IoHeart className={cx('icon_like')} />
                            </button>
                            <p className={cx('amount')}>{videoAction.likes_count}</p>
                        </div>
                    )}
                    <div className={cx('item')}>
                        <button className={cx('action_btn')}>
                            <FaCommentDots className={cx('icon')} />
                        </button>
                        <p className={cx('amount')}>{videoAction.comments_count}</p>
                    </div>
                    <div className={cx('item')}>
                        <button className={cx('action_btn')}>
                            <FaShare className={cx('icon')} />
                        </button>
                        <p className={cx('amount')}>{videoAction.shares_count}</p>
                    </div>
                </div>
            </div>
            <div className={cx('comment_list_container')}>
                <div className={cx('comment_item_container')}>
                    {!loading ? (
                        listComment ? (
                            listComment.length > 0 ? (
                                listComment.map((result) => (
                                    <CommentItem key={result.id} data={result} user={userRedux} />
                                ))
                            ) : (
                                'No comment'
                            )
                        ) : (
                            'Log in to see and comment'
                        )
                    ) : (
                        <LoadMore />
                    )}
                </div>
            </div>

            {userRedux ? (
                <form onSubmit={onFormSubmit}>
                    <div className={cx('bottom_comment_container')}>
                        <input
                            type="text"
                            placeholder="Add comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button type="submit" primary>
                            Post
                        </Button>
                    </div>
                </form>
            ) : (
                <>
                    <Button
                        className={cx('button_login', 'bottom_comment_container')}
                        onClick={() => setIsDialogOpen(!isDialogOpen)}
                    >
                        Log in to comment
                    </Button>
                    {isDialogOpen && <LoginDialog onClose={() => setIsDialogOpen(!isDialogOpen)} />}
                </>
            )}
        </div>
    );
}

export default ListComment;
