import { lazy } from 'react';

import config from '~/config';

const HeaderOnly = lazy(() => import('~/layouts/HeaderOnly'));
const VideoDetail = lazy(() => import('~/pages/VideoDetail'));
const Home = lazy(() => import('~/pages/Home'));
const Following = lazy(() => import('~/pages/Following'));
const Profile = lazy(() => import('~/pages/Profile'));
const Upload = lazy(() => import('~/pages/Upload'));
const Live = lazy(() => import('~/pages/Live'));

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.following,
        component: Following,
    },
    {
        path: config.routes.profile,
        component: Profile,
    },
    {
        path: config.routes.live,
        component: Live,
    },
    {
        path: config.routes.video,
        component: VideoDetail,
        layout: null,
    },
];

const privateRoutes = [
    {
        path: config.routes.upload,
        component: Upload,
        layout: HeaderOnly,
    },
];

export { publicRoutes, privateRoutes };
