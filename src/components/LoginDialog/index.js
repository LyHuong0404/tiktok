import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

import SignupDialog from '~/components/SignupDialog';
import * as userService from '~/services/userService';
import styles from './LoginDialog.module.scss';
import Error from '~/components/Error';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function LoginDialog({ onClose }) {
    const { loading, error } = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(true);
    const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitForm = async (data) => {
        try {
            await dispatch(userService.userLogin(data)).unwrap();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className={cx(`wrapper${isOpen ? 'open' : ''}`)}>
                <div className={cx('auth_form')}>
                    <div className={cx('auth_form_overlay')}></div>
                    <div className={cx('auth_form_body')}>
                        <div className={cx('wrapper_close')}>
                            <FontAwesomeIcon
                                className={cx('close')}
                                icon={faCircleXmark}
                                onClick={() => {
                                    onClose();
                                    setIsOpen(!isOpen);
                                }}
                            />
                        </div>
                        <form onSubmit={handleSubmit(submitForm)}>
                            <div className={cx('login_form')}>
                                <strong className={cx('logo')}>Log in to TikTok</strong>
                                <input
                                    className={cx('input')}
                                    type="email"
                                    placeholder="Email"
                                    {...register('email', { required: true })}
                                />
                                {errors.email && <span className={cx('error')}>Please fill in your email</span>}
                                <input
                                    className={cx('input')}
                                    type="password"
                                    placeholder="Password"
                                    {...register('password', { required: true })}
                                />
                                {errors.password && <span className={cx('error')}>Please fill in your password</span>}
                                {error && <Error>Wrong email or password</Error>}
                                <Button disabled={loading} primary type="submit" className={cx('login_button')}>
                                    Log in
                                </Button>
                            </div>
                        </form>

                        <div className={cx('signup')}>
                            <p className={cx('label')}>Don't have an account? </p>
                            <p
                                className={cx('title')}
                                onClick={() => {
                                    setIsSignupDialogOpen(!isSignupDialogOpen);
                                    setIsOpen(!isOpen);
                                }}
                            >
                                Sign up
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {isSignupDialogOpen && (
                <SignupDialog
                    onClose={() => {
                        setIsSignupDialogOpen(!isSignupDialogOpen);
                        setIsOpen(!isOpen);
                    }}
                />
            )}
        </div>
    );
}

export default LoginDialog;
