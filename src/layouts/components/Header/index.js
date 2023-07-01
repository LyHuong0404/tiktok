import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import { useDispatch } from 'react-redux';
import { useState, useEffect, memo } from 'react';

import * as userService from '~/services/userService';
import { MENU_ITEMS, USER_MENU } from '~/components/Menu';
import config from '~/config';
import * as authenService from '~/services/authentication/authServices';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { MessageIcon, InboxIcon } from '~/components/Icons';
import Image from '~/components/Image/index';
import Search from '../Search';

const cx = classNames.bind(styles);

function Header({ isDialogOpen }) {
    const { user } = useSelector((state) => state.user);
    const [currentUser, setCurrentUser] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            const fetchApi = async () => {
                const result = await authenService.getCurrentUser();
                setCurrentUser(result);
            };
            fetchApi();
        }
    }, [user]);

    const handleMenuChange = (menuItem) => {
        switch (menuItem.to) {
            case '/profile':
                navigate(config.routes.profileLink(currentUser.nickname));
                break;
            case '/logout':
                dispatch(userService.userLogout());
                break;
            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>
                <Search />
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Link to={config.routes.upload}>
                                <Button className={cx('upload-btn')} rectangle>
                                    + Upload
                                </Button>
                            </Link>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <div onClick={isDialogOpen}>
                            <Button className={cx('upload-btn')} rectangle>
                                + Upload
                            </Button>

                            <Button className={cx('upload-btn')} primary>
                                Log in
                            </Button>
                        </div>
                    )}

                    <Menu items={user ? USER_MENU : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image src={currentUser.avatar} className={cx('user-avatar')} alt={currentUser.nickname} />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}
export default memo(Header);
