import { useLocation } from 'react-router-dom';
import VideoLink from '~/components/VideoDetail';

function VideoDetail() {
    const location = useLocation();

    return <VideoLink data={location.state?.video} />;
}

export default VideoDetail;
