import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { memo } from 'react';

import * as suggestedAccountService from '~/services/suggestedAccountService';
import styles from './Sidebar.module.scss';
import Menu from './Menu/Menu';
import MenuItem from './Menu/MenuItem';
import config from '~/config';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import SuggestedAccount from '~/components/SuggestedAccount';
import Hashtag from '~/components/Hashtag';
import Button from '~/components/Button';
import FollowingAccount from '~/components/FollowingAccount';

const cx = classNames.bind(styles);

function Sidebar({ isDialogOpen }) {
    const { user } = useSelector((state) => state.user);
    const [account, setAccount] = useState([]);

    //suggestedaccount
    useEffect(() => {
        const fetchApi = async () => {
            const result = await suggestedAccountService.getSuggestedAccount(1, 15);
            const filter = result.filter((account) => !account.is_followed);
            setAccount(filter);
        };

        fetchApi();
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>

            {user ? (
                <div>
                    <SuggestedAccount label="Suggested Accounts" data={account} />
                    <FollowingAccount label="Following Accounts" />
                </div>
            ) : (
                <div className={cx('login_wrapper')}>
                    <p className={cx('description')}>Log in to follow creators, like videos, and view comments.</p>

                    <Button className={cx('login_btn')} outline large onClick={isDialogOpen}>
                        Log in
                    </Button>
                </div>
            )}

            <Hashtag />
        </aside>
    );
}

export default memo(Sidebar);
