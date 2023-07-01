import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import config from '~/config';
import LoadMore from '~/components/LoadMore';
import * as userService from '~/services/userService';
import * as authenService from '~/services/authentication/authServices';
import styles from './EditProfileDialog.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function EditProfileDialog() {
    const [currentUser, setCurrentUser] = useState({});
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [filePreview, setFilePreview] = useState('');
    const [avatar, setAvatar] = useState('');
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar);
        };
    }, [avatar]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await authenService.getCurrentUser();
            setCurrentUser(result);
            setIsLoading(false);
        };
        fetchApi();
    }, []);

    //preview file
    const handleAvatar = (e) => {
        const src = URL.createObjectURL(e.target.files[0]);
        setFilePreview(src);
        setAvatar(e.target.files[0]);
    };

    const handleUpdateProfile = async (data) => {
        setIsLoading(true);
        await userService.updateProfile(data);
        setIsLoading(false);

        const userProfile = config.routes.profileLink(currentUser.nickname);
        navigate(userProfile);
        window.location.reload();
        setIsOpen(!isOpen);
    };

    const submitForm = async (data) => {
        let fullData;

        if (!avatar) {
            fullData = { ...data };
        } else {
            fullData = { ...data, avatar: avatar };
        }

        //handle input element doesn't change
        const formData = new FormData();
        for (const key in fullData) {
            if (fullData[key] === '') {
                fullData[key] = currentUser[key];
            }
            formData.append(key, fullData[key]);
        }

        handleUpdateProfile(formData);
    };

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className={cx(`wrapper${isOpen ? '' : 'close'}`)}>
                <div className={cx('edit_form')}>
                    <div className={cx('edit_form_overlay')}></div>
                    <div className={cx('edit_form_body')}>
                        <div className={cx('header')}>
                            <strong className={cx('title')}>Edit Profile</strong>
                            <FontAwesomeIcon
                                icon={faXmark}
                                className={cx('close')}
                                disabled={isLoading}
                                onClick={() => setIsOpen(!isOpen)}
                            />
                        </div>
                        {currentUser ? (
                            <div className={cx('inner')}>
                                <div className={cx('avatar_wrapper')}>
                                    <h4 className={cx('title_input')}>Profile photo</h4>
                                    <label>
                                        <Image
                                            className={cx('image')}
                                            src={avatar ? filePreview : currentUser.avatar}
                                            alt={currentUser.nickname}
                                        />
                                        <input type="file" style={{ display: 'none' }} onChange={handleAvatar} />
                                    </label>
                                </div>
                                <div className={cx('feild')}>
                                    <h4 className={cx('title_input')}>First Name</h4>
                                    <input
                                        className={cx('input_value')}
                                        id="first_name"
                                        name="first_name"
                                        {...register('first_name')}
                                        defaultValue={currentUser.first_name}
                                    />
                                </div>
                                <div className={cx('feild')}>
                                    <h4 className={cx('title_input')}>Last Name</h4>
                                    <input
                                        id="last_name"
                                        name="last_name"
                                        className={cx('input_value')}
                                        {...register('last_name')}
                                        defaultValue={currentUser.last_name}
                                    />
                                </div>
                                <div className={cx('feild')}>
                                    <h4 className={cx('title_input')}>Bio</h4>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        className={cx('textarea')}
                                        rows="4"
                                        cols="50"
                                        {...register('bio')}
                                        defaultValue={currentUser.bio}
                                    ></textarea>
                                </div>
                            </div>
                        ) : (
                            <LoadMore />
                        )}

                        <div className={cx('footer')}>
                            <Button disabled={isLoading} type="submit" primary className={cx('button')}>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default EditProfileDialog;
