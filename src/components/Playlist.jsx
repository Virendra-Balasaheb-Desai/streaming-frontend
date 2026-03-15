import React from "react";
import { playlistList } from "./data";

const Playlist = () => {
    const playlist = playlistList[0];
    playlist.videos = playlist.videos.filter((video) => video.isPublished);

    return (
        <section className="w-full overflow-y-auto pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
                <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
                    <div className="relative mb-2 w-full pt-[56%]">
                        <div className="absolute inset-0">
                            <img
                                src={playlist.videos[0].thumbnail}
                                alt={playlist.name}
                                className="h-full w-full"
                            />
                            <div className="absolute inset-x-0 bottom-0">
                                <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                                    <div className="relative z-[1]">
                                        <p className="flex justify-between">
                                            <span className="inline-block">
                                                Playlist
                                            </span>
                                            <span className="inline-block">
                                                {playlist.videos.length}
                                                &nbsp;videos
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-200">
                                            {playlist.views}{" "}
                                            Views&nbsp;&middot;&nbsp;
                                            {playlist.createdAt}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h6 className="mb-1 font-semibold">{playlist.name}</h6>
                    <p className="flex text-sm text-gray-200">
                        {playlist.description}
                    </p>
                    <div className="mt-6 flex items-center gap-x-3">
                        <div className="h-16 w-16 shrink-0">
                            <img
                                src={playlist.owner.avatar}
                                alt={playlist.owner.fullName}
                                className="h-full w-full rounded-full"
                            />
                        </div>
                        <div className="w-full">
                            <h6 className="font-semibold">
                                {playlist.owner.fullName}
                            </h6>
                            <p className="text-sm text-gray-300">
                                {playlist.owner.subscribers} Subscribers
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-y-4">
                    {playlist.videos.map(
                        (video) =>
                            video.isPublished && (
                                <div key={video.id} className="border">
                                    <div className="w-full max-w-3xl gap-x-4 sm:flex">
                                        <div className="relative mb-2 w-full sm:mb-0 sm:w-5/12">
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
                                        <div className="flex gap-x-2 px-2 sm:w-7/12 sm:px-0">
                                            <div className="h-10 w-10 shrink-0 sm:hidden">
                                                <img
                                                    src={video.owner.avatar}
                                                    alt={video.owner.username}
                                                    className="h-full w-full rounded-full"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <h6 className="mb-1 font-semibold sm:max-w-[75%]">
                                                    {video.title}
                                                </h6>
                                                <p className="flex text-sm text-gray-200 sm:mt-3">
                                                    {video.views}&nbsp;Views
                                                    &middot; {video.time}
                                                </p>
                                                <div className="flex items-center gap-x-4">
                                                    <div className="mt-2 hidden h-10 w-10 shrink-0 sm:block">
                                                        <img
                                                            src={
                                                                video.owner
                                                                    .avatar
                                                            }
                                                            alt={
                                                                video.owner
                                                                    .username
                                                            }
                                                            className="h-full w-full rounded-full"
                                                        />
                                                    </div>
                                                    <p className="text-sm text-gray-200">
                                                        {video.owner.fullName}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>
        </section>
    );
};

export default Playlist;
