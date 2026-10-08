import React, { useEffect, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import Playlist from "./Playlist";
import Subscribed from "./Subscribed";
import Tweet from "./Tweet";
import Video from "./Video";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import user from "../../api/user";
import Loading from "../Loading";
import ErrorState from "../ErrorState";
import subscription from "../../api/subscription";

const Channel = () => {
    const [isSelectedComponent, setIsSelectedComponent] = useState("video");
    const [channelDetails, setChannelDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { status: authStatus } = useSelector((state) => state.auth);

    const { channelId } = useParams();
    const selectComponent = {
        video: <Video />,
        playlist: <Playlist />,
        tweet: <Tweet />,
        subscribed: <Subscribed />,
    };

    const toggleSubscribe = async () => {
        try {
            // setError(null);
            // setIsLoading(true);
            const data = await subscription.toggleSubscription(channelId);
            console.log("toggle subscribe data : ", data);
            setChannelDetails({
                ...channelDetails,
                isSubscriber: !channelDetails.isSubscriber,
            });
        } catch (e) {
            setError(e);
        }
        // finally{
        //     setIsLoading(false);
        // }
    };

    useEffect(() => {
        const getChannelDetails = async () => {
            try {
                setError(null);
                setIsLoading(true);
                let data;
                if (authStatus) {
                    data = await user.getUserChannelDetailsProtected(channelId);
                } else {
                    data = await user.getUserChannelDetails(channelId);
                }
                console.log("channel details data : ", data);
                setChannelDetails({ ...channelDetails, ...data });
            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };
        getChannelDetails();
    }, [channelId]);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <ErrorState message={error?.message || "Something went wrong"} />
        );
    }

    return (
        <section className="relative w-full overflow-y-auto pb-[70px]  sm:pb-0 ">
            <div className="relative min-h-[150px] w-full pt-[16.28%]">
                <div className="absolute inset-0 overflow-hidden">
                    <img src={channelDetails?.coverImage} alt="cover-photo" />
                </div>
            </div>
            <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-4 pb-4 pt-6">
                    <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                        <img
                            src={channelDetails?.avatar}
                            alt="avatar-photo"
                            className="h-full w-full"
                        />
                    </span>

                    <div className="mr-auto inline-block">
                        <h1 className="font-bolg text-xl">
                            {channelDetails?.fullName}
                        </h1>
                        <p className="text-sm text-gray-400">
                            @{channelDetails?.username}
                        </p>
                        <p className="text-sm text-gray-400">
                            {channelDetails?.subscribersCount || 0}{" "}
                            Subscribers&nbsp;&middot;&nbsp;
                            {channelDetails?.subscribedCount || 0} Subscribed
                        </p>
                    </div>

                    <div className="inline-block">
                        <div className="inline-flex min-w-[145px] justify-end">
                            {authStatus && (
                                <button
                                    className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                                    onClick={toggleSubscribe}
                                >
                                    <span className="inline-block w-5">
                                        <UserPlusIcon strokeWidth={2} />
                                    </span>
                                    {channelDetails?.isSubscriber
                                        ? "Unsubscribe"
                                        : "Subscribe"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <ul className="no-scrollbar sticky top-0 z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2">
                    <li className="w-full">
                        <button
                            className={`w-full border-b-2 ${isSelectedComponent === "video" ? "border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]" : "border-transparent px-3 py-1.5 text-gray-400"}`}
                            onClick={() => setIsSelectedComponent("video")}
                        >
                            Videos
                        </button>
                    </li>
                    <li className="w-full">
                        <button
                            className={`w-full border-b-2 ${isSelectedComponent === "playlist" ? "border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]" : "border-transparent px-3 py-1.5 text-gray-400"}`}
                            onClick={() => setIsSelectedComponent("playlist")}
                        >
                            Playlist
                        </button>
                    </li>
                    <li className="w-full">
                        <button
                            className={`w-full border-b-2 ${isSelectedComponent === "tweet" ? "border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]" : "border-transparent px-3 py-1.5 text-gray-400"}`}
                            onClick={() => setIsSelectedComponent("tweet")}
                        >
                            Tweets
                        </button>
                    </li>
                    <li className="w-full">
                        <button
                            className={`w-full border-b-2 ${isSelectedComponent === "subscribed" ? "border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]" : "border-transparent px-3 py-1.5 text-gray-400"}`}
                            onClick={() => setIsSelectedComponent("subscribed")}
                        >
                            Subscribed
                        </button>
                    </li>
                </ul>

                {/* Injecting components based on tab */}
                {selectComponent[isSelectedComponent]}
            </div>
        </section>
    );
};

export default Channel;
