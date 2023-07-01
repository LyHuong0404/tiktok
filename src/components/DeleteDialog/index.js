import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Loading from '~/components/Loading';
import styles from './DeleteDialog.module.scss';
import Button from '~/components/Button';
import * as videoService from '~/services/videoServices';
import config from '~/config';

const cx = classNames.bind(styles);

function DeleteDialog({ video, onClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleDeleteVideo = async () => {
        setIsLoading(true);
        await videoService.deleteVideo(video.id);
        const userProfile = config.routes.profileLink(video.user.nickname);
        navigate(userProfile);
        setIsLoading(false);
    };
    return (
        <div className={cx(`wrapper${isOpen ? 'open' : ''}`)}>
            <div className={cx('delete_form')}>
                <div className={cx('delete_form_overlay')}></div>
                <div className={cx('delete_form_body')}>
                    <strong className={cx('title')}>Are you sure you want to delete this video?</strong>
                    <Button
                        style={{ borderTop: '1px solid #e3e3e4' }}
                        text
                        className={cx('btn')}
                        onClick={handleDeleteVideo}
                    >
                        Delete
                    </Button>
                    <Button
                        style={{ marginLeft: '0px', borderTop: '1px solid #e3e3e4' }}
                        text
                        className={cx('btn')}
                        onClick={() => {
                            onClose();
                            setIsOpen(!isOpen);
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
            {isLoading && <Loading />}
        </div>
    );
}

export default DeleteDialog;
