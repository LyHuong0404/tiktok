import classNames from 'classnames/bind';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Load from '~/components/Loading';
import Error from '~/components/Error';
import config from '~/config';
import * as videoServices from '~/services/videoServices';
import styles from './Upload.module.scss';
import { UploadIcon } from '~/components/Icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Upload() {
    const { user } = useSelector((state) => state.user);
    const [filePreview, setFilePreview] = useState('');
    const [file, setFile] = useState('');
    const [caption, setCaption] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [formKey, setFormKey] = useState(Date.now());

    //preview file
    const handleFile = (e) => {
        const src = URL.createObjectURL(e.target.files[0]);
        setFilePreview(src);
        setFile(e.target.files[0]);
    };

    const handleUploadVideo = async (data) => {
        setIsLoading(true);
        await videoServices.postVideo(data);
        setIsLoading(false);

        const userProfile = config.routes.profileLink(user.nickname);
        navigate(userProfile);
    };

    const handleDiscard = () => {
        reset();
        setFilePreview('');
        setFile('');
        setCaption('');
        setValue('upload_file', '');
        setValue('description', '');
        setValue('thumbnail_time', '1');
        setValue('music', '');
        setValue('viewable', 'public');
        setValue('allows', ['comment', 'duet', 'stitch']);
        setFormKey(Date.now()); //fix lỗi "An invalid form control with name='upload_file' is not focusable."
    };
    const submitForm = (data) => {
        const fullData = { ...data, upload_file: file };

        const formData = new FormData();

        for (const key in fullData) {
            if (key === 'allows') {
                if (fullData[key])
                    fullData.allows.forEach(function (value) {
                        formData.append('allows[]', value);
                    });
            } else {
                formData.append(key, fullData[key]);
            }
        }

        handleUploadVideo(formData);
    };

    return (
        <form key={formKey} onSubmit={handleSubmit(submitForm)} className={cx('upload_wrapper')}>
            <div className={cx('upload_container')}>
                <span className={cx('upload_title')}>Upload video</span>
                <div className={cx('upload_sub_title')}>
                    <span>Post a video to your account</span>
                </div>
                <div className={cx('upload_content')}>
                    <div className={file ? `${cx('preview')}` : `${cx('upload_content_left')}`}>
                        <label htmlFor="upload_file">
                            <div className={cx('upload_state')}>
                                {file ? (
                                    <div className={cx('preview_v2')}>
                                        <video
                                            className={cx('video_preview')}
                                            src={filePreview}
                                            autoPlay
                                            preload="auto"
                                            playsInline=""
                                            crossOrigin="anonymous"
                                            loop
                                            type="video/*"
                                            controls
                                        ></video>
                                        <div className={cx('phone_preview')}></div>
                                    </div>
                                ) : (
                                    <>
                                        <UploadIcon />
                                        <span className={cx('upload_state_title')}>Select video to upload</span>
                                        <span className={cx('upload_state_sub_title')}>Or drag and drop a file</span>
                                        <span className={cx('upload_state_notice')}>MP4 or WebM</span>
                                        <span className={cx('upload_state_notice')}>720x1280 resolution or higher</span>
                                        <span className={cx('upload_state_notice')}>Up to 10 minutes</span>
                                        <span className={cx('upload_state_notice')}>Less than 2 GB</span>
                                        <p className={cx('select_file')}>Select File</p>
                                    </>
                                )}
                            </div>
                        </label>
                        <input
                            onChange={handleFile}
                            name="upload_file"
                            id="upload_file"
                            required
                            type="file"
                            accept="video/*"
                        />
                    </div>
                    <div className={cx('upload_content_right')}>
                        <div className={cx('form_item')}>
                            <div className={cx('form_header')}>
                                <span className={cx('form_label')}>Caption</span>
                                <span className={cx('form_count')}> {caption.length}/ 150</span>
                            </div>
                            <div className={cx('form_footer')}>
                                <textarea
                                    maxLength={150}
                                    className={cx('form_textarea')}
                                    name="description"
                                    id="description"
                                    {...register('description', { required: true })}
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                />
                            </div>
                            {errors.description && <Error className={cx('error')}>Please fill in caption</Error>}
                        </div>
                        <div className={cx('form_item')}>
                            <div className={cx('form_header')}>
                                <span className={cx('form_label')}>Cover</span>
                            </div>
                            <div className={cx('form_footer')}>
                                <input
                                    className={cx('form_input')}
                                    name="thumbnail_time"
                                    id="thumbnail_time"
                                    {...register('thumbnail_time')}
                                    min={1}
                                    type="number"
                                    defaultValue={1}
                                />
                            </div>
                        </div>

                        <div className={cx('form_item')}>
                            <div className={cx('form_header')}>
                                <span className={cx('form_label')}>Music</span>
                            </div>
                            <div className={cx('form_footer')}>
                                <input
                                    className={cx('form_input')}
                                    name="music"
                                    id="music"
                                    type="text"
                                    placeholder="Music"
                                    {...register('music', { required: true })}
                                />
                            </div>
                            {errors.music && <Error className={cx('error')}>Please fill in music</Error>}
                        </div>
                        <div className={cx('form_item')}>
                            <div className={cx('form_header')}>
                                <span className={cx('form_label')}>Who can watch this video</span>
                            </div>
                            <div className={cx('form_footer')}>
                                <select
                                    className={cx('form_select')}
                                    name="viewable"
                                    id="viewable"
                                    {...register('viewable')}
                                >
                                    <option value="public">Public</option>
                                    <option value="friends">Friends</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                        </div>
                        <div className={cx('form_item')}>
                            <div className={cx('form_header')}>
                                <span className={cx('form_label')}>Allow users to:</span>
                            </div>
                            <div className={cx('form_footer')}>
                                <div className={cx('form_checkbox')}>
                                    <input
                                        value="comment"
                                        type="checkbox"
                                        name="allows"
                                        defaultChecked
                                        {...register('allows')}
                                    />
                                    <label htmlFor="">Comment</label>
                                </div>
                                <div className={cx('form_checkbox')}>
                                    <input
                                        value="duet"
                                        type="checkbox"
                                        name="allows"
                                        defaultChecked
                                        {...register('allows')}
                                    />
                                    <label htmlFor="">Duet</label>
                                </div>
                                <div className={cx('form_checkbox')}>
                                    <input
                                        className={cx('custom_input_color')}
                                        value="stitch"
                                        type="checkbox"
                                        name="allows"
                                        defaultChecked
                                        {...register('allows')}
                                    />
                                    <label htmlFor="">Stitch</label>
                                </div>
                            </div>
                        </div>
                        <div className={cx('button_container')}>
                            <Button
                                onClick={handleDiscard}
                                disabled={!file || isLoading}
                                rectangle
                                className={cx('discard')}
                            >
                                Discard
                            </Button>

                            <Button primary disabled={!file || isLoading} className={cx('post')} type="submit">
                                Post
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && <Load />}
        </form>
    );
}

export default Upload;
