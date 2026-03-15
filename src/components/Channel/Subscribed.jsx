import React from "react";
import { classNames } from "../../utils";
import { MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/outline";
import { channels } from "../data";

const Subscribed = () => {
    return (
        <>
            {channels.length <= 0 ? (
                <div className="flex justify-center p-4">
                    <div className="w-full max-w-sm text-center">
                        <p className="mb-3 w-full">
                            <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                                <span className="inline-block w-6">
                                    <UsersIcon className="w-6" />
                                </span>
                            </span>
                        </p>
                        <h5 className="mb-2 font-semibold">
                            No people subscribers
                        </h5>
                        <p>
                            This channel has yet to <strong>subscribe</strong> a
                            new channel.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-y-4 py-4">
                    <div className="relative mb-2 rounded-lg bg-white py-2 pl-8 pr-3 text-black">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                            <MagnifyingGlassIcon
                                className="h-5 w-5"
                                strokeWidth={2}
                            />
                        </span>
                        <input
                            className="w-full bg-transparent outline-none"
                            placeholder="Search"
                        />
                    </div>

                    {channels.map((channel, i) => (
                        <div
                            className="flex w-full justify-between"
                            key={channel.id + "-" + i}
                        >
                            <div className="flex items-center gap-x-2">
                                <div className="h-14 w-14 shrink-0">
                                    <img
                                        src={channel.avatar}
                                        alt={channel.fullName}
                                        className="h-full w-full rounded-full"
                                    />
                                </div>
                                <div className="block">
                                    <h6 className="font-semibold">
                                        {channel.fullName}
                                    </h6>
                                    <p className="text-sm text-gray-300">
                                        {channel.subscribers}&nbsp;Subscribers
                                    </p>
                                </div>
                            </div>
                            <div className="block">
                                <button
                                    className={classNames(
                                        "group/btn px-3 py-2 text-black",
                                        channel.isSubscribed
                                            ? "bg-[#ae7aff] focus:bg-white"
                                            : "bg-white focus:bg-[#ae7aff]"
                                    )}
                                >
                                    <span className="group-focus/btn:hidden">
                                        {channel.isSubscribed
                                            ? "Subscribed"
                                            : "Subscribe"}
                                    </span>
                                    <span className="hidden group-focus/btn:inline">
                                        {!channel.isSubscribed
                                            ? "Subscribed"
                                            : "Subscribe"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Subscribed;
