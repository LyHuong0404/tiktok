import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './DiscardDialog.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function DiscardDialog({ handleDiscard, onClose }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={cx(`wrapper${isOpen ? 'open' : ''}`)}>
            <div className={cx('discard_form')}>
                <div className={cx('discard_form_overlay')}></div>
                <div className={cx('discard_form_body')}>
                    <p className={cx('title')}>Discard this post?</p>
                    <span className={cx('note')}>The video and all edits will be discarded.</span>

                    <Button
                        primary
                        className={cx('btn')}
                        onClick={() => {
                            handleDiscard();
                            onClose();
                            setIsOpen(!isOpen);
                        }}
                    >
                        Discard
                    </Button>
                    {/* ngăn 2 button kế nhau ảnh hướng margin-left */}
                    <input style={{ display: 'none' }} />
                    <Button
                        rectangle
                        className={cx('btn')}
                        onClick={() => {
                            onClose();
                            setIsOpen(!isOpen);
                        }}
                    >
                        Continue editing
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DiscardDialog;
