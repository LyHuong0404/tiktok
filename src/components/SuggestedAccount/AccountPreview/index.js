import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import handleFollow from '~/services/followService';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    const [user, setUser] = useState(data);
    const handleFollowFunc = async () => {
        const isFollow = await handleFollow(user);
        setUser((user) => ({ ...user, is_followed: isFollow }));
    };
    return (
        <div className={cx('account-item')}>
            <header className={cx('header')}>
                <Image className={cx('avatar')} src={user.avatar} alt={user.nickname} />
                {user.is_followed ? (
                    <Button className={cx('follow-btn')} outline onClick={handleFollowFunc}>
                        Following
                    </Button>
                ) : (
                    <Button className={cx('follow-btn')} primary onClick={handleFollowFunc}>
                        Follow
                    </Button>
                )}
            </header>
            <div className={cx('item-info')}>
                <p className={cx('nickname')}>
                    <strong>{user.nickname}</strong>
                    {user.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>{`${user.first_name} ${user.last_name}`}</p>
            </div>

            <div className={cx('number-followers')}>
                <strong className={cx('value')}>{`${user.followers_count}`}M </strong>
                <span className={cx('label')}>Followers</span>
                <strong className={cx('value')}>{`${user.likes_count}`}M </strong>
                <span className={cx('label')}>Likes</span>
            </div>
        </div>
    );
}
AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};
export default AccountPreview;
