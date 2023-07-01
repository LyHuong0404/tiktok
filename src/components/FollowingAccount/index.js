import { useState, useEffect, memo } from 'react';
import classNames from 'classnames/bind';

import * as followingAccountService from '~/services/followingAccountService';
import styles from './FollowingAccount.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function FollowingAccount({ label }) {
    const [account, setAccount] = useState([]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await followingAccountService.listFollowingAccount(page);
            setAccount((prevUsers) => [...prevUsers, ...result]);
        };

        fetchApi();
    }, [page]);

    const handleViewChange = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {account?.map((result) => (
                <AccountItem key={result.id} data={result} />
            ))}

            <p className={cx('load-more-btn')} onClick={handleViewChange}>
                See more
            </p>
        </div>
    );
}

export default memo(FollowingAccount);
