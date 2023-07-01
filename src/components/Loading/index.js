import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import classNames from 'classnames/bind';

import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function LoadMore() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('auth_form')}>
                <div className={cx('auth_form_overlay')}></div>
                <FaSpinner className={cx('spinner')} />
            </div>
        </div>
    );
}

export default LoadMore;
