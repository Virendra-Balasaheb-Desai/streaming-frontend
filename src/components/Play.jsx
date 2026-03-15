import React from "react";
import {
    CheckIcon,
    FolderPlusIcon,
    HandThumbDownIcon,
    HandThumbUpIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import { videos, videoDetails } from "./data";

const Play = () => {
    return (
        <section className="w-full pb-[70px] overflow-y-auto sm:pb-0">
            <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
                <div className="col-span-12 w-full">
                    <div className="relative mb-4 w-full pt-[56%]">
                        <div className="absolute inset-0">
                            <video
                                className="h-full w-full"
                                controls
                                autoPlay
                                muted
                            >
                                <source
                                    src={videoDetails.videoFile}
                                    type={videoDetails.videoType}
                                />
                            </video>
                        </div>
                    </div>
                    <div
                        className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
                        role="button"
                        tabIndex={0}
                    >
                        <div className="flex flex-wrap gap-y-2">
                            <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                                <h1 className="text-lg font-bold">
                                    {videoDetails.title}
                                </h1>
                                <p className="flex text-sm text-gray-200">
                                    {videoDetails.views}&nbsp;Views &middot;
                                    {videoDetails.createdAt}
                                </p>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                                <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                                    <div className="flex overflow-hidden rounded-lg border">
                                        <button
                                            className="group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"
                                            data-like={videoDetails.likeCount}
                                            data-like-alt={
                                                videoDetails.liked
                                                    ? videoDetails.likeCount - 1
                                                    : videoDetails.likeCount + 1
                                            }
                                        >
                                            <span
                                                className={`inline-block w-5 ${
                                                    videoDetails.liked
                                                        ? "text-[#ae7aff] group-focus/btn:text-inherit"
                                                        : "group-focus/btn:text-[#ae7aff]"
                                                }`}
                                            >
                                                <HandThumbUpIcon />
                                            </span>
                                        </button>
                                        <button
                                            className="group/btn flex items-center gap-x-2 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"
                                            data-like={
                                                videoDetails.dislikeCount
                                            }
                                            data-like-alt={
                                                videoDetails.disliked
                                                    ? videoDetails.dislikeCount -
                                                      1
                                                    : videoDetails.dislikeCount +
                                                      1
                                            }
                                        >
                                            <span
                                                className={`inline-block w-5 ${
                                                    videoDetails.disliked
                                                        ? "text-[#ae7aff] group-focus/btn:text-inherit"
                                                        : "group-focus/btn:text-[#ae7aff]"
                                                }`}
                                            >
                                                <HandThumbDownIcon />
                                            </span>
                                        </button>
                                    </div>
                                    <div className="relative block">
                                        <button className="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black">
                                            <span className="inline-block w-5">
                                                <FolderPlusIcon />
                                            </span>
                                            Save
                                        </button>
                                        <div className="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30 hover:block peer-focus:block">
                                            <h3 className="mb-4 text-center text-lg font-semibold">
                                                Save to playlist
                                            </h3>
                                            <ul className="mb-4">
                                                {[
                                                    "Collections",
                                                    "JavaScript Basics",
                                                    "C++ Tuts",
                                                    "Feel Good Music",
                                                    "Ed Sheeran",
                                                    "Python",
                                                ].map((playlistName) => (
                                                    <li
                                                        key={playlistName}
                                                        className="mb-2 last:mb-0"
                                                    >
                                                        <label
                                                            className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                                            htmlFor={
                                                                playlistName +
                                                                "-checkbox"
                                                            }
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                className="peer hidden"
                                                                id={
                                                                    playlistName +
                                                                    "-checkbox"
                                                                }
                                                            />
                                                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                                                <CheckIcon
                                                                    strokeWidth={
                                                                        3
                                                                    }
                                                                />
                                                            </span>
                                                            {playlistName}
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="flex flex-col">
                                                <label
                                                    htmlFor="playlist-name"
                                                    className="mb-1 inline-block cursor-pointer"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#ae7aff]"
                                                    id="playlist-name"
                                                    placeholder="Enter playlist name"
                                                />
                                                <button className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black">
                                                    Create new playlist
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-x-4">
                                <div className="mt-2 h-12 w-12 shrink-0">
                                    <img
                                        src={videoDetails.owner.avatar}
                                        alt={videoDetails.owner.username}
                                        className="h-full w-full rounded-full"
                                    />
                                </div>
                                <div className="block">
                                    <p className="text-gray-200">
                                        {videoDetails.owner.fullName}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {videoDetails.owner.subscribers}{" "}
                                        Subscribers
                                    </p>
                                </div>
                            </div>
                            <div className="block">
                                <button className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                                    <span className="inline-block w-5">
                                        <UserPlusIcon strokeWidth={2} />
                                    </span>
                                    <span className="group-focus/btn:hidden">
                                        Subscribe
                                    </span>
                                    <span className="hidden group-focus/btn:block">
                                        Subscribed
                                    </span>
                                </button>
                            </div>
                        </div>
                        <hr className="my-4 border-white" />
                        <div className="h-5 overflow-hidden group-focus:h-auto">
                            <p className="text-sm">
                                {videoDetails.description}
                            </p>
                        </div>
                    </div>
                    <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
                        <h6 className="font-semibold">
                            {videoDetails.commentCount} Comments...
                        </h6>
                    </button>
                    <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
                        <div className="block">
                            <h6 className="mb-4 font-semibold">
                                {videoDetails.commentCount} Comments
                            </h6>
                            <input
                                type="text"
                                className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                                placeholder="Add a Comment"
                            />
                        </div>
                        <hr className="my-4 border-white" />
                        {videoDetails.comments.map((comment) => (
                            <div key={comment.id}>
                                <div className="flex gap-x-4">
                                    <div className="mt-2 h-11 w-11 shrink-0">
                                        <img
                                            src={comment.owner.avatar}
                                            alt={comment.owner.username}
                                            className="h-full w-full rounded-full"
                                        />
                                    </div>
                                    <div className="block">
                                        <p className="flex items-center text-gray-200">
                                            {comment.owner.fullName}
                                            &nbsp;&middot;&nbsp;
                                            <span className="text-sm">
                                                {comment.createdAt}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-200">
                                            @{comment.owner.username}
                                        </p>
                                        <p className="mt-3 text-sm">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>

                                <hr className="my-4 border-white" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
                    {videos
                        .filter((video) => video.isPublished)
                        .map((video) => (
                            <div
                                key={video.id}
                                className="w-full gap-x-2 border pr-2 md:flex"
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
                                <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                                    <div className="h-12 w-12 shrink-0 md:hidden">
                                        <img
                                            src={videoDetails.owner.avatar}
                                            alt={videoDetails.owner.username}
                                            className="h-full w-full rounded-full"
                                        />
                                    </div>
                                    <div className="w-full pt-1 md:pt-0">
                                        <h6 className="mb-1 text-sm font-semibold">
                                            {video.title}
                                        </h6>
                                        <p className="mb-0.5 mt-2 text-sm text-gray-200">
                                            {video.owner.fullName}
                                        </p>
                                        <p className="flex text-sm text-gray-200">
                                            {video.views}&nbsp;Views &middot;{" "}
                                            {video.time}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Play;
