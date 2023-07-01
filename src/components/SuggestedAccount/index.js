import classNames from 'classnames/bind';
import styles from './SuggestedAccount.module.scss';
import AccountItem from './AccountItem';
import { useState, memo } from 'react';

const cx = classNames.bind(styles);

function SuggestedAccount({ label, data = [] }) {
    const [showAll, setShowAll] = useState(false);
    const visibleCount = showAll ? data.length : 5;
    const handleViewChange = () => {
        setShowAll(!showAll);
    };
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {data.slice(0, visibleCount).map((result) => (
                <AccountItem key={result.id} data={result} />
            ))}

            <p className={cx('load-more-btn')} onClick={handleViewChange}>
                {showAll ? 'See less' : 'See all'}
            </p>
        </div>
    );
}

export default memo(SuggestedAccount);
