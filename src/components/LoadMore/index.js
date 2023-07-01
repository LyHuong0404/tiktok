import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import classNames from 'classnames/bind';

import styles from './LoadMore.module.scss';

const cx = classNames.bind(styles);

function LoadMore() {
    return (
        <div className={cx('wrapper')}>
            <FaSpinner className={cx('spinner')} />
        </div>
    );
}

export default LoadMore;
