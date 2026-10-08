import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Play from "./pages/Play";
import Account from "./pages/Account";
import Channel from "./pages/Channel";
import Playlist from "./pages/Playlist";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import Auth from "./components/Auth";
import WatchHistory from "./pages/WatchHistory";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/search/:query",
                element: <Search />,
            },
            {
                path: "/play/:videoId",
                element: <Play />,
            },
            {
                path: "/account",
                element: (
                    <Auth protectedRoute={true}>
                        <Account />
                    </Auth>
                ),
            },
            {
                path: "/channel/:channelId",
                element: <Channel />,
            },
            {
                path: "/playlist/:playlistId",
                element: <Playlist />,
            },
            {
                path: "/dashboard",
                element: (
                    <Auth protectedRoute={true}>
                        <Dashboard />
                    </Auth>
                ),
            },
            {
                path: "/watch-history",
                element: (
                    <Auth protectedRoute={true}>
                        <WatchHistory />
                    </Auth>
                ),
            },
            {
                path: "/login",
                element: (
                    <Auth protectedRoute={false}>
                        <Login />
                    </Auth>
                ),
            },
            {
                path: "/register",
                element: (
                    <Auth protectedRoute={false}>
                        <Register />
                    </Auth>
                ),
            },
            {
                path: "/*",
                element: <PageNotFound />,
            },
        ],
    },
]);
