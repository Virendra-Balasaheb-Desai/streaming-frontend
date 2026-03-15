import React from "react";
import { videos } from "./data";

const Search = () => {
    return (
        <section className="w-full h-[calc(100vh-66px)] sm:h-[calc(100vh-82px)] overflow-y-auto pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div className="flex flex-col gap-4 p-4">
                {videos
                    .filter((video) => video.isPublished)
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
                                        {video.duration}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-x-2 md:w-7/12">
                                <div className="h-10 w-10 shrink-0 md:hidden">
                                    <img
                                        src={video.owner.avatar}
                                        alt={video.owner.username}
                                        className="h-full w-full rounded-full"
                                    />
                                </div>
                                <div className="w-full">
                                    <h6 className="mb-1 font-semibold md:max-w-[75%]">
                                        {video.title}
                                    </h6>
                                    <p className="flex text-sm text-gray-200 sm:mt-3">
                                        {video.views}&nbsp;Views &middot;{" "}
                                        {video.time}
                                    </p>
                                    <div className="flex items-center gap-x-4">
                                        <div className="mt-2 hidden h-10 w-10 shrink-0 md:block">
                                            <img
                                                src={video.owner.avatar}
                                                alt={video.owner.username}
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
        </section>
    );
};

export default Search;
