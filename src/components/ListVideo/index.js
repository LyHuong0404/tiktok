import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import LoadMore from '~/components/LoadMore';
import styles from './ListVideo.module.scss';
import Video from '~/components/ListVideo/Video';
import * as homeService from '~/services/homeService';

const cx = classNames.bind(styles);

function ListVideo({ type }) {
    const [listVideo, setListVideo] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(2);

    useEffect(() => {
        const getListVideo = async () => {
            const result = await homeService.getVideoHome(type);
            //lỗi api cần xử lý thêm type
            let filteredVideos;
            if (type === 'for-you') {
                filteredVideos = result.filter((video) => !video.user.is_followed);
            } else {
                filteredVideos = result.filter((video) => video.user.is_followed);
            }

            setListVideo(filteredVideos);
        };

        getListVideo();
    }, [type]);

    const fetchListVideo = async () => {
        const result = await homeService.getVideoHome(type, page);
        return result;
    };

    const fetchData = async () => {
        const listVideoNext = await fetchListVideo();

        setListVideo([...listVideo, ...listVideoNext]);
        if (listVideoNext.length === 0 || listVideoNext.length < 15) {
            setHasMore(false);
        }
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className={cx('wrapper')}>
            <InfiniteScroll
                dataLength={listVideo.length}
                next={fetchData}
                hasMore={hasMore}
                LoadMoreer={<LoadMore />}
                endMessage={<h4 style={{ textAlign: 'center' }}>You have seen it all !</h4>}
            >
                {listVideo.map((video) => (
                    <Video key={video.id} data={video} />
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default ListVideo;
