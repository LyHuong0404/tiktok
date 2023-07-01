import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { useState } from 'react';

import * as userService from '~/services/userService';
import styles from './SignupDialog.module.scss';
import Error from '~/components/Error';
import Button from '~/components/Button';
import LoadMore from '../LoadMore';

const cx = classNames.bind(styles);

function SignupDialog({ onClose }) {
    const { loading, error } = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitForm = async (data) => {
        try {
            await dispatch(userService.userRegister(data)).unwrap();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className={cx(`wrapper${isOpen ? 'open' : ''}`)}>
                <div className={cx('auth_form')}>
                    <div className={cx('auth_form_overlay')}></div>
                    <div className={cx('auth_form_body')}>
                        <div className={cx('wrapper_close')}>
                            <IoChevronBackCircleOutline
                                className={cx('close')}
                                onClick={() => {
                                    onClose();
                                    setIsOpen(!isOpen);
                                }}
                            />
                        </div>

                        <div className={cx('signup_form')}>
                            <strong className={cx('logo')}>Sign up</strong>
                            <input value="email" type="hidden" name="type" id="type" {...register('type')} />
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
                            {error && <Error>Email already exists</Error>}
                            {loading && <LoadMore />}
                            <Button disabled={loading} type="submit" primary className={cx('signup_button')}>
                                Sign up
                            </Button>
                        </div>
                        <div className={cx('login')}>
                            <p className={cx('label')}>Already have an account? </p>
                            <p
                                className={cx('title')}
                                onClick={() => {
                                    onClose();
                                    setIsOpen(!isOpen);
                                }}
                            >
                                Log in
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SignupDialog;
