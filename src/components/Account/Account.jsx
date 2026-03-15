import React, { useState } from "react";
import ChangePassword from "./ChangePassword";
import EditPersonalInfo from "./EditPersonalInfo";
import EditChannelInfo from "./EditChannelInfo";

const Account = () => {
    const [isSelectedComponent, setIsSelectedComponent] = useState("personal");
    const selectComponent = {
        personal: <EditPersonalInfo />,
        channel: <EditChannelInfo />,
        password: <ChangePassword />,
    };

    return (
        <section className="w-full overflow-y-auto pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div className="relative min-h-[150px] w-full pt-[16.28%]">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.pexels.com/photos/1092424/pexels-photo-1092424.jpeg?auto=compress"
                        alt="cover-photo"
                    />
                </div>
            </div>
            <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-4 pb-4 pt-6">
                    <div className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                        <img
                            src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Channel"
                            className="h-full w-full"
                        />
                    </div>

                    <div className="mr-auto inline-block">
                        <h1 className="font-bolg text-xl">React Patterns</h1>
                        <p className="text-sm text-gray-400">@reactpatterns</p>
                    </div>

                    <div className="inline-block">
                        <button className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                            View channel
                        </button>
                    </div>
                </div>

                <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
                    <li className="w-full">
                        <button
                            className={`w-full border-b-2 ${isSelectedComponent === "personal" ? "border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]" : "border-transparent px-3 py-1.5 text-gray-400"}`}
                            onClick={() => setIsSelectedComponent("personal")}
                        >
                            Personal Information
                        </button>
                    </li>
                    <li className="w-full">
                        <button
                            className={`w-full border-b-2 ${isSelectedComponent === "channel" ? "border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]" : "border-transparent px-3 py-1.5 text-gray-400"}`}
                            onClick={() => setIsSelectedComponent("channel")}
                        >
                            Channel Information
                        </button>
                    </li>
                    <li className="w-full">
                        <button
                            className={`w-full border-b-2 ${isSelectedComponent === "password" ? "border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]" : "border-transparent px-3 py-1.5 text-gray-400"}`}
                            onClick={() => setIsSelectedComponent("password")}
                        >
                            Change Password
                        </button>
                    </li>
                </ul>

                {/* Injecting components based on tab */}
                {selectComponent[isSelectedComponent]}
            </div>
        </section>
    );
};

export default Account;
