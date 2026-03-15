import React from "react";
import { videos } from "./data";
import { PlayIcon } from "@heroicons/react/24/outline";

const Home = () => {
    //videos
    //fetching

    return (
        <section className="w-full h-[calc(100vh-66px)] sm:h-[calc(100vh-82px)] overflow-auto pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            {videos.length <= 0 ? (
                <div className="flex h-[80vh] items-center justify-center">
                    <div className="w-full max-w-sm text-center">
                        <p className="mb-3 w-full">
                            <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                                <PlayIcon className="w-6" />
                            </span>
                        </p>
                        <h5 className="mb-2 font-semibold">
                            No videos available
                        </h5>
                        <p>
                            There are no videos here available. Please try to
                            search some thing else.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
                    {videos
                        .filter((video) => video.isPublished)
                        .map((video) => (
                            <div key={video.id} className="w-full">
                                <div className="relative mb-2 w-full pt-[56%]">
                                    <div className="absolute inset-0">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="h-full w-full"
                                        />
                                    </div>
                                    <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                                        {video.duration}
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
                                            {video.time}
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

export default Home;
