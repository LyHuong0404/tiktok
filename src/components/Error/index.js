import React from 'react';
import classNames from 'classnames/bind';

import styles from './Error.module.scss';

const cx = classNames.bind(styles);
function Error({ children }) {
    return <span className={cx('error')}>{children}</span>;
}

export default Error;
