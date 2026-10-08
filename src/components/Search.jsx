import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import video from "../api/video";
import { formatDuration, formatTimeAgo } from "../utils";
import Loading from "./Loading";
import { PlayIcon } from "@heroicons/react/24/outline";
import ErrorState from "./ErrorState";

const Search = () => {
    const { query } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [page, setPage] = useState(1);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);

    const getAllVideo = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await video.searchVideos(query);
            console.log(data);
            const fetchedData = data?.docs;
            setVideos([...videos, ...fetchedData]);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getAllVideo();
    }, []);

    if (isLoading) return <Loading />;

    if (error)
        return (
            <ErrorState message={error?.message || "Something went wrong"} />
        );

    return (
        <section className="w-full h-[calc(100vh-66px)] sm:h-[calc(100vh-82px)] overflow-y-auto pb-[70px]  sm:pb-0 ">
            {videos.length === 0 ? (
                <div className="p-4 text-center flex flex-col justify-center items-center gap-4 h-full">
                    <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                        <PlayIcon className="w-6" />
                    </span>
                    <p className="text-lg">No videos found for "{query}"</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4 p-4">
                    {videos
                        .filter((video) => video.isPublised)
                        .map((video) => (
                            <div
                                key={video.id}
                                className="w-full max-w-3xl gap-x-4 md:flex"
                            >
                                <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                                    <div className="w-full pt-[56%]">
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
                                </div>
                                <div className="flex gap-x-2 md:w-7/12">
                                    <div className="h-10 w-10 shrink-0 md:hidden">
                                        <img
                                            src={video.owner[0].avatar}
                                            alt={video.owner[0].username}
                                            className="h-full w-full rounded-full"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <h6 className="mb-1 font-semibold md:max-w-[75%]">
                                            {video.title}
                                        </h6>
                                        <p className="flex text-sm text-gray-200 sm:mt-3">
                                            {video.views}&nbsp;Views &middot;{" "}
                                            {formatTimeAgo(video.createdAt)}
                                        </p>
                                        <div className="flex items-center gap-x-4">
                                            <div className="mt-2 hidden h-10 w-10 shrink-0 md:block">
                                                <img
                                                    src={video.owner[0].avatar}
                                                    alt={
                                                        video.owner[0].username
                                                    }
                                                    className="h-full w-full rounded-full"
                                                />
                                            </div>
                                            <p className="text-sm text-gray-200">
                                                {video.owner.fullName}
                                            </p>
                                        </div>
                                        <p className="mt-2 hidden text-sm md:block">
                                            {video.description}
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

export default Search;
