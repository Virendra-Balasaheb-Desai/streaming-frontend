import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { navItems, logo } from "./data";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/authSlicer";
import userApi from "../api/user";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
    const { status, user } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearch = () => {
        const query = searchQuery.trim();

        if (!query) return;

        navigate(`/search/${encodeURIComponent(query)}`);
        setMobileMenuOpen(false);
        window.location.reload();
    };

    const handleLogout = async () => {
        try {
            await userApi.logout();

            dispatch(clearUser());

            setMobileMenuOpen(false);

            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleNavigation = (url) => {
        setMobileMenuOpen(false);
        navigate(url);
    };

    // Prevent background page from scrolling
    // when mobile drawer is open.
    useEffect(() => {
        if (!mobileMenuOpen) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    // Close mobile menu with Escape
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#121212] text-white">
                <nav className="mx-auto flex h-[66px] max-w-[1600px] justify-between items-center gap-4 px-4 sm:h-[82px] sm:px-6">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen((prev) => !prev)}
                        className="flex h-10 w-10 items-center justify-center rounded-full hidden hover:bg-white/10 sm:block "
                        aria-label={
                            sidebarOpen ? "Collapse sidebar" : "Expand sidebar"
                        }
                    >
                        <span className="flex w-5 flex-col justify-self-center my-auto gap-1">
                            <span className="h-[2px] w-full bg-white" />
                            <span className="h-[2px] w-2/3 bg-white" />
                            <span className="h-[2px] w-full bg-white" />
                        </span>
                    </button>
                    {/* Logo */}
                    <Link to="/" className="shrink-0" aria-label="Home">
                        <div className="w-12 sm:w-16">{logo}</div>
                    </Link>

                    {/* Desktop Search */}
                    <div className="relative mx-auto hidden w-full max-w-[600px] sm:block">
                        <input
                            type="search"
                            className="w-full rounded-full border border-white/20 bg-[#0f0f0f] py-2 pl-10 pr-12 text-md text-white outline-none transition focus:border-[#ae7aff] focus:ring-1 focus:ring-[#ae7aff]"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                        />

                        <button
                            type="button"
                            onClick={handleSearch}
                            className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-2 text-gray-300 hover:bg-white/10 hover:text-white"
                            aria-label="Search"
                        >
                            <MagnifyingGlassIcon className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Mobile Search */}
                    {/* <button
                        type="button"
                        className="ml-auto rounded-full p-2 hover:bg-white/10 sm:hidden"
                        onClick={() => {
                            setMobileMenuOpen(false);
                        }}
                        aria-label="Search"
                    >
                        <MagnifyingGlassIcon className="h-6 w-6" />
                    </button> */}

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="rounded-full p-2 hover:bg-white/10 sm:hidden"
                        aria-label="Open menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        <span className="flex w-6 flex-col gap-1.5">
                            <span className="h-[2px] w-full bg-white" />
                            <span className="h-[2px] w-2/3 bg-white" />
                            <span className="h-[2px] w-full bg-white" />
                        </span>
                    </button>

                    {/* Desktop User Section */}
                    <div className="hidden shrink-0 items-center gap-3 sm:flex">
                        {!status ? (
                            <>
                                <Link
                                    to="/login"
                                    className="rounded-md px-4 py-2 text-sm font-medium hover:bg-white/10"
                                >
                                    Log in
                                </Link>

                                <Link
                                    to="/register"
                                    className="mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(`/channel/${user._id}`)
                                    }
                                    className="rounded-full transition hover:ring-2 hover:ring-[#ae7aff]"
                                    aria-label="Open profile"
                                >
                                    <img
                                        src={user.avatar}
                                        alt={user.fullName}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                </button>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-[100] sm:hidden 
                    ${mobileMenuOpen ? "visible" : "invisible"}
                `}
            >
                {/* Overlay */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`absolute inset-0 bg-black/70 transition-opacity 
                        ${mobileMenuOpen ? "opacity-100" : "opacity-0"}
                    `}
                    aria-label="Close menu"
                />

                {/* Drawer */}
                <aside
                    className={`absolute right-0 top-0 flex h-full w-[85%] max-w-[360px] flex-col bg-[#121212] shadow-2xl transition-transform duration-300 ${
                        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }
                    `}
                >
                    {/* Drawer Header */}
                    <div className="flex h-[66px] shrink-0 items-center justify-between border-b border-white/10 px-5">
                        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                            <div className="w-12">{logo}</div>
                        </Link>

                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="rounded-full p-2 hover:bg-white/10"
                            aria-label="Close menu"
                        >
                            <XMarkIcon className="h-7 w-7" />
                        </button>
                    </div>

                    {/* Mobile Search */}
                    <div className="border-b border-white/10 p-4">
                        <div className="relative">
                            <input
                                type="search"
                                className="w-full rounded-full border border-white/20 bg-[#0f0f0f] py-2 pl-4 pr-12 text-sm text-white outline-none focus:border-[#ae7aff]"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(event) =>
                                    setSearchQuery(event.target.value)
                                }
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                            />

                            <button
                                type="button"
                                onClick={handleSearch}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-white/10"
                                aria-label="Search"
                            >
                                <MagnifyingGlassIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-2">
                            {navItems
                                .filter((item) => item.mobileView)
                                .map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.url}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                            className="flex w-full items-center gap-4 rounded-md border border-white/10 px-4 py-3 transition hover:border-[#ae7aff] hover:bg-[#ae7aff] hover:text-black"
                                        >
                                            <span className="h-5 w-5 shrink-0">
                                                {item.icon}
                                            </span>

                                            <span className="font-medium">
                                                {item.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </nav>

                    {/* Bottom User Section */}
                    <div className="shrink-0 border-t border-white/10 p-4">
                        {!status ? (
                            <div className="flex gap-3">
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex-1 rounded-md bg-[#383737] px-4 py-3 text-center font-medium hover:bg-[#4f4e4e]"
                                >
                                    Log in
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex-1 rounded-md bg-[#ae7aff] px-4 py-3 text-center font-bold text-black hover:bg-[#c09aff]]"
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleNavigation(`/channel/${user._id}`)
                                    }
                                    className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-white/5"
                                >
                                    <img
                                        src={user.avatar}
                                        alt={user.fullName}
                                        className="
                                            h-12
                                            w-12
                                            rounded-full
                                            object-cover
                                        "
                                    />

                                    <div className="min-w-0">
                                        <h6 className="truncate font-semibold">
                                            {user.fullName}
                                        </h6>

                                        <p className="truncate text-sm text-gray-400">
                                            @{user.username}
                                        </p>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full rounded-md bg-[#ae7aff] px-4 py-3 font-bold text-black hover:bg-[#c09aff]"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </>
    );
};

export default Navbar;
