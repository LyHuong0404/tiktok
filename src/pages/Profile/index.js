import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import AccountProfile from '~/components/AccountProfile';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('wrapper')}>
            <AccountProfile />
        </div>
    );
}

export default Profile;
