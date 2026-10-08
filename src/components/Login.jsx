import React, { useEffect, useState } from "react";
import { logo } from "./data";
import user from "../api/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlicer";
import Loading from "./Loading";
import ErrorState from "./ErrorState";

const Login = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const fetchData = await user.login(data);
            console.log(fetchData);
            dispatch(setUser(fetchData.user));
            navigate("/");
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    if (isLoading) return <Loading />;

    if (error)
        return (
            <ErrorState message={error?.message || "Something went wrong"} />
        );

    return (
        <form className="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
            <div className="mx-auto inline-block w-16">{logo}</div>
            <div className="mb-6 w-full text-center text-2xl font-semibold uppercase">
                Play
            </div>

            <label htmlFor="email" className="mb-1 inline-block text-gray-300">
                Email
            </label>
            <input
                id="email"
                type="text"
                placeholder="Enter your email"
                className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                name="email"
                onChange={handleChange}
            />
            <div className="mb-1 inline-block text-gray-300">Or</div>
            <label
                htmlFor="username"
                className="mb-1 inline-block text-gray-300"
            >
                Username
            </label>
            <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                name="username"
                onChange={handleChange}
            />
            <label
                htmlFor="password"
                className="mb-1 inline-block text-gray-300"
            >
                Password*
            </label>
            <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                name="password"
                onChange={handleChange}
            />
            <button
                type="submit"
                className="bg-[#ae7aff] px-4 py-3 text-black"
                disabled={isLoading}
                onClick={handleLogin}
            >
                {isLoading ? "Signing in..." : "Sign in"}
            </button>
        </form>
    );
};

export default Login;
