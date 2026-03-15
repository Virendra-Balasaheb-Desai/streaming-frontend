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
                path: "/search",
                element: <Search />,
            },
            {
                path: "/play",
                element: <Play />,
            },
            {
                path: "/account",
                element: <Account />,
            },
            {
                path: "/channel",
                element: <Channel />,
            },
            {
                path: "/playlist",
                element: <Playlist />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/*",
                element: <PageNotFound />,
            },
        ],
    },
]);
