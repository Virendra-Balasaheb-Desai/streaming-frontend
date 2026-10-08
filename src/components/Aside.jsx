import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./data";

const Aside = ({ sidebarOpen }) => {
    const location = useLocation();

    return (
        <aside
            className={`hidden shrink-0 border-r border-white/10 bg-[#121212] sm:block transition-[width] duration-200 ease-in-out
                ${sidebarOpen ? "w-[240px]" : "w-[72px]"}
            `}
        >
            <nav className="sticky top-[82px] p-2">
                <ul className="flex flex-col gap-1">
                    {navItems.map((item) => {
                        const active = location.pathname === item.url;

                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.url}
                                    className={`flex items-center gap-4 rounded-lg px-3 py-3 transition-colors
                                        ${
                                            active
                                                ? "bg-white/10 text-[#ae7aff]"
                                                : "hover:bg-white/10"
                                        }
                                        ${
                                            sidebarOpen
                                                ? "justify-start"
                                                : "justify-center"
                                        }
                                    `}
                                >
                                    <span className="h-6 w-6 shrink-0">
                                        {item.icon}
                                    </span>

                                    {sidebarOpen && (
                                        <span className="whitespace-nowrap">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Aside;
