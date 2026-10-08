import { useEffect, useState } from "react";
import Loading from "./Loading";
import ErrorState from "./ErrorState";
import user from "../api/user";
import { useNavigate } from "react-router-dom";
import { PlayIcon } from "@heroicons/react/24/outline";
import { formatDuration, formatTimeAgo } from "../utils";

const WatchHistory = () => {
    const navigate = useNavigate();
    const [watchHistory, setWatchHistory] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getWatchHistory = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await user.getUserWatchHistory();
            const fetchedData = data;
            if (data.length > 0) setWatchHistory([...fetchedData]);
            console.log("watchHistory : ", data);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getWatchHistory();
    }, []);

    const handleVideoClick = (videoId) => {
        navigate(`/play/${videoId}`);
    };

    if (isLoading) return <Loading />;

    if (error) return <ErrorState error={error} />;

    return (
        <section className="w-full h-[calc(100vh-66px)] sm:h-[calc(100vh-82px)] overflow-auto pb-[70px]  sm:pb-0 ">
            <h1 className="text-2xl text-center font-bold m-4">
                Watch History
            </h1>
            {watchHistory.length <= 0 ? (
                <div className="flex justify-center p-4">
                    <div className="w-full max-w-sm text-center">
                        <p className="mb-3 w-full">
                            <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                                <PlayIcon className="w-6" />
                            </span>
                        </p>
                        <h5 className="mb-2 font-semibold">
                            No videos watched
                        </h5>
                        <p>
                            You have not watched any videos yet. Start watching
                            videos to build your watch history.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
                    {watchHistory.map((video) => (
                        <div
                            key={video._id}
                            className="w-full cursor-pointer"
                            onClick={() => handleVideoClick(video._id)}
                        >
                            <div className="relative mb-2 w-full pt-[56%]">
                                <div className="absolute inset-0">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="h-full w-full"
                                    />
                                </div>
                                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                                    {formatDuration(video.duration)}
                                </span>
                            </div>
                            <div className="flex gap-x-2">
                                <div className="h-10 w-10 shrink-0">
                                    <img
                                        src={video.owner.avatar}
                                        alt={video.owner.username}
                                        className="h-full w-full rounded-full"
                                    />
                                </div>
                                <div className="w-full">
                                    <h6 className="mb-1 font-semibold">
                                        {video.title}
                                    </h6>
                                    <p className="flex text-sm text-gray-200">
                                        {video.views}&nbsp;Views &middot;{" "}
                                        {formatTimeAgo(video.createdAt)}
                                    </p>
                                    <p className="text-sm text-gray-200">
                                        {video.owner.fullName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default WatchHistory;
