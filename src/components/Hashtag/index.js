import classNames from 'classnames/bind';

import styles from './Hashtag.module.scss';

const cx = classNames.bind(styles);

function Hashtag() {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('hashtag')}>About</p>
            <p className={cx('hashtag')}>Newsroom</p>
            <p className={cx('hashtag')}>Contact</p>
            <p className={cx('hashtag')}>Careers</p>
            <p className={cx('hashtag')}>Byte</p>
            <p className={cx('hashtag')}>Dance</p>
            <p className={cx('hashtag')}>TikTok for Good</p>
            <p className={cx('hashtag')}>Advertise</p>
            <p className={cx('hashtag')}>Developers</p>
            <p className={cx('hashtag')}>Transparency</p>
            <p className={cx('hashtag')}>TikTok</p>
            <p className={cx('hashtag')}>Rewards</p>
            <p className={cx('hashtag')}>TikTok</p>
            <p className={cx('hashtag')}>Embeds</p>
        </div>
    );
}

export default Hashtag;
