import React, { useState } from "react";
import { logo } from "./data";
import user from "../api/user";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlicer";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import ErrorState from "./ErrorState";

const Register = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegister = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            const fetchData = await user.register(formData);
            console.log(fetchData);
            dispatch(setUser(fetchData.user));
            navigate("/");
        } catch (e) {
            setError(e);
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        console.log(name, files[0]);
        setData((prev) => ({ ...prev, [name]: files[0] }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleRegister();
    };

    if (isLoading) return <Loading />;

    if (error)
        return (
            <ErrorState message={error?.message || "Something went wrong"} />
        );

    return (
        <section className="w-full overflow-y-auto ">
            <form
                className="mx-auto max-w-sm flex flex-col my-8 px-4"
                onSubmit={handleFormSubmit}
            >
                <div className="mx-auto inline-block w-16">{logo}</div>
                <div className="mb-6 w-full text-center text-2xl font-semibold uppercase">
                    Play
                </div>

                <label
                    htmlFor="email"
                    className="mb-1 inline-block text-gray-300"
                >
                    Email*
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                    onChange={handleChange}
                    name="email"
                />
                <label
                    htmlFor="fullname"
                    className="mb-1 inline-block text-gray-300"
                >
                    Full Name*
                </label>
                <input
                    id="fullname"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                    onChange={handleChange}
                    name="fullName"
                />
                <label
                    htmlFor="username"
                    className="mb-1 inline-block text-gray-300"
                >
                    Choose a Username*
                </label>
                <input
                    id="username"
                    type="test"
                    placeholder="Enter a username"
                    required
                    className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                    onChange={handleChange}
                    name="username"
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
                    required
                    className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                    onChange={handleChange}
                    name="password"
                />
                <label
                    htmlFor="avatar-image"
                    className="mb-1 inline-block text-gray-300"
                >
                    Avatar Image*
                </label>
                <input
                    id="avatar-image"
                    type="file"
                    accept="image/*"
                    required
                    className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                    onChange={handleImageChange}
                    name="avatar"
                />
                <label
                    htmlFor="cover-image"
                    className="mb-1 inline-block text-gray-300"
                >
                    Cover Image
                </label>
                <input
                    id="cover-image"
                    type="file"
                    accept="image/*"
                    className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                    onChange={handleImageChange}
                    name="coverImage"
                />
                <button
                    type="submit"
                    className="bg-[#ae7aff] px-4 py-3 text-black"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                </button>
            </form>
        </section>
    );
};

export default Register;
