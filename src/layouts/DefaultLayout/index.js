import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useCallback, useState } from 'react';

import LoginDialog from '~/components/LoginDialog';
import Header from '~/layouts/components/Header';
import styles from './DefaultLayout.module.scss';
import Sidebar from '~/layouts/components/Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

    const handleDialogOpen = useCallback(() => {
        setIsLoginDialogOpen(!isLoginDialogOpen);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Header isDialogOpen={handleDialogOpen} />
            <div className={cx('container')}>
                <Sidebar isDialogOpen={handleDialogOpen} />
                <div className={cx('content')}>{children}</div>
            </div>
            {isLoginDialogOpen && <LoginDialog onClose={() => setIsLoginDialogOpen(!isLoginDialogOpen)} />}
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
