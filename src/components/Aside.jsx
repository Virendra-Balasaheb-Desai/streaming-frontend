import React from "react";
import { classNames } from "../utils";
import { bottomTotalItems, navItems } from "./data";
import { useLocation } from "react-router-dom";

const Aside = () => {
    const location = useLocation();
    console.log(location.pathname);
    if (location.pathname === "/dashboard") return <></>;
    return (
        <aside className="group absolute inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-white bg-[#121212] px-2 py-2 sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] lg:sticky">
            <ul className="flex justify-around gap-y-2 lg:top-[10px] sm:sticky sm:top-[100px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
                {navItems.map((item, i, arr) => (
                    <li
                        key={item.name}
                        className={classNames(
                            item.mobileView ? "" : "hidden sm:block",
                            arr.length - i === bottomTotalItems ? "mt-auto" : ""
                        )}
                    >
                        <button className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4">
                            <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                                {item.icon}
                            </span>
                            <span className="block sm:hidden sm:group-hover:inline">
                                {item.name}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Aside;
