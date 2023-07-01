import { Fragment, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import config from './config';
import VideoDetail from './pages/VideoDetail';
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import LoadMore from './components/LoadMore';

function App() {
    const location = useLocation();
    const videoDetail = location.state && location.state.videoDetail;

    return (
        <div className="App">
            <Suspense fallback={<LoadMore />}>
                <Routes location={videoDetail || location}>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                path={route.path}
                                key={index}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
                {videoDetail && (
                    <Routes>
                        <Route exact path={config.routes.video} element={<VideoDetail />} />
                    </Routes>
                )}
            </Suspense>
            <ToastContainer />
        </div>
    );
}

export default App;
