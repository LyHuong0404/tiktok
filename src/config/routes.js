const routes = {
    home: '/',
    following: '/following',
    profile: '/:nickname',
    profileLink: (nickname) => `/${nickname}`,
    upload: '/upload',
    search: '/search',
    live: '/live',
    video: '/videos/:id',
    videoLink: (id) => `/videos/${id}`,
};

export default routes;
