import { useSelector } from 'react-redux';

import FollowingNoLogin from '~/pages/FollowingNoLogin';
import ListVideo from '~/components/ListVideo';

function Following() {
    const { user } = useSelector((state) => state.user);
    return <>{user ? <ListVideo type="following" /> : <FollowingNoLogin />}</>;
}

export default Following;
