import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/outline";
import subscription from "../../api/subscription";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import ErrorState from "../ErrorState";
// import { channels } from "../data";

const Subscribed = () => {
    const [channels, setChannels] = useState([]);
    const { channelId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const getChannels = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await subscription.getSubscribedChannels(channelId);
            console.log("data : ", data);
            setChannels([...data]);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getChannels();
    }, []);

    const unSubcribeChannel = async (id) => {
        try {
            setError(null);
            setIsLoading(true);
            await subscription.toggleSubscription(id);
            getChannels();
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;

        setSearch(value);
        filteredChannels(value.toLowerCase());
        if (value.length === 0) {
            getChannels();
        }
    };
    const fuzzyMatch = (text, search) => {
        if (!text || !search) return false;

        text = text.toLowerCase();
        search = search.toLowerCase();

        let searchIndex = 0;

        for (let i = 0; i < text.length && searchIndex < search.length; i++) {
            if (text[i] == search[searchIndex]) {
                searchIndex++;
            }
        }

        return searchIndex == search.length;
    };

    const filteredChannels = (searchValue) => {
        const filtered = channels.filter((channel) => {
            const username = channel.subscribed?.[0]?.username;
            return username.toLowerCase().match(searchValue);
            // return fuzzyMatch(username, searchValue);
        });

        setChannels(filtered);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <ErrorState message={error?.message || "Something went wrong"} />
        );
    }

    return (
        <>
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
                        onChange={handleChange}
                        value={search}
                    />
                </div>
            </div>
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
                    {channels.map((channel) => (
                        <div
                            className="flex w-full justify-between"
                            key={channel._id}
                        >
                            <div className="flex items-center gap-x-2">
                                <div className="h-14 w-14 shrink-0">
                                    <img
                                        src={channel.subscribed[0].avatar}
                                        alt={channel.subscribed[0].fullName}
                                        className="h-full w-full rounded-full"
                                    />
                                </div>
                                <div className="block">
                                    <h6 className="font-semibold">
                                        {channel.subscribed[0].username}
                                    </h6>
                                    <p className="text-sm text-gray-300">
                                        {channel.subscribed[0].subscribers}
                                        &nbsp;Subscribers
                                    </p>
                                </div>
                            </div>
                            <div className="block">
                                <button
                                    className="px-3 py-2 text-black bg-[#ae7aff] rounded-full"
                                    onClick={() =>
                                        unSubcribeChannel(
                                            channel.subscribed[0]._id
                                        )
                                    }
                                >
                                    UnSubscribed
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
