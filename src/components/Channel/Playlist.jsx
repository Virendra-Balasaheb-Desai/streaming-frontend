import React, { useState } from "react";
import { icons, playlistList } from "../data";

const Playlist = () => {
    const [isOwner, setIsOwner] = useState(true);

    return (
        <>
            {!!isOwner && (
                <div className="flex justify-end p-4">
                    <button
                        className="mt-4 inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black"
                        onClick={() => setIsUpload(!isUpload)}
                    >
                        <PlusIcon className="h-5 w-5" strokeWidth={2} /> Upload
                        video
                    </button>
                </div>
            )}

            {playlistList.length <= 0 ? (
                <div className="flex justify-center p-4">
                    <div className="w-full max-w-sm text-center">
                        <p className="mb-3 w-full">
                            <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                                <span className="inline-block w-6">
                                    {icons.collections}
                                </span>
                            </span>
                        </p>
                        <h5 className="mb-2 font-semibold">
                            No playlist created
                        </h5>
                        <p>There are no playlist created on this channel.</p>
                    </div>
                </div>
            ) : (
                <div className="grid gap-4 pt-2 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]">
                    {playlistList.map(
                        (playlist) =>
                            playlist.videos.filter((video) => video.isPublished)
                                .length > 0 && (
                                <div key={playlist.id} className="w-full">
                                    <div className="relative mb-2 w-full pt-[56%]">
                                        <div className="absolute inset-0">
                                            <img
                                                src={
                                                    playlist.videos.find(
                                                        (video) =>
                                                            video.isPublished
                                                    ).thumbnail
                                                }
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
                                                                {
                                                                    playlist.videos.filter(
                                                                        (
                                                                            video
                                                                        ) =>
                                                                            video.isPublished
                                                                    ).length
                                                                }
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
                                    <h6 className="mb-1 font-semibold">
                                        {playlist.name}
                                    </h6>
                                    <p className="flex text-sm text-gray-200">
                                        {playlist.description}
                                    </p>
                                </div>
                            )
                    )}
                </div>
            )}
        </>
    );
};

export default Playlist;
