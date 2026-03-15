import React, { useState } from "react";
import {
    PlayIcon,
    PlusIcon,
    ArrowUpTrayIcon,
    FilmIcon,
    XMarkIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { videos } from "../data";

const Video = () => {
    const [isOwner, setIsOwner] = useState(true);
    const [isUpload, setIsUpload] = useState(false);
    const [isUploading, setIsUploading] = useState(true);
    const [isUploaded, setIsUploaded] = useState(false);

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
            {videos.length <= 0 ? (
                <div className="flex justify-center p-4">
                    <div className="w-full max-w-sm text-center">
                        <p className="mb-3 w-full">
                            <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                                <PlayIcon className="w-6" />
                            </span>
                        </p>
                        <h5 className="mb-2 font-semibold">
                            No videos uploaded
                        </h5>
                        <p>
                            This page has yet to upload a video. Search another
                            page in order to find more videos.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
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
                                <h6 className="mb-1 font-semibold">
                                    {video.title}
                                </h6>
                                <p className="flex text-sm text-gray-200">
                                    {video.views}&nbsp;Views &middot;{" "}
                                    {video.time}
                                </p>
                            </div>
                        ))}
                </div>
            )}
            {/* Upload Popup */}
            {!!isUpload && (
                <div className="absolute inset-0 z-10 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">
                    <div className="h-full overflow-auto border bg-[#121212]">
                        <div className="flex items-center justify-between border-b p-4">
                            <h2 className="text-xl font-semibold">
                                Upload Videos
                            </h2>
                            <div className="flex items-center justify-between gap-4">
                                <button className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
                                    Upload
                                </button>
                                <button
                                    className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                                    onClick={() => setIsUpload(!isUpload)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                        <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 p-4">
                            <div className="w-full border-2 border-dashed px-4 py-12 text-center">
                                <span className="mb-4 inline-block w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
                                    <ArrowUpTrayIcon />
                                </span>
                                <h6 className="mb-2 font-semibold">
                                    Drag and drop video files to upload
                                </h6>
                                <p className="text-gray-400">
                                    Your videos will be private untill you
                                    publish them.
                                </p>
                                <label
                                    htmlFor="upload-video"
                                    className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                                >
                                    <input
                                        type="file"
                                        id="upload-video"
                                        className="sr-only"
                                    />
                                    Select Files
                                </label>
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="thumbnail"
                                    className="mb-1 inline-block"
                                >
                                    Thumbnail<sup>*</sup>
                                </label>
                                <input
                                    id="thumbnail"
                                    type="file"
                                    className="w-full border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="title"
                                    className="mb-1 inline-block"
                                >
                                    Title<sup>*</sup>
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    className="w-full border bg-transparent px-2 py-1 outline-none"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="desc"
                                    className="mb-1 inline-block"
                                >
                                    Description<sup>*</sup>
                                </label>
                                <textarea
                                    id="desc"
                                    className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Uploading/Uploaded Popup */}
            {(!!isUploading || !!isUploaded) && (
                <div className="absolute inset-x-0 top-0 z-10 flex h-[calc(100vh-66px)] items-center justify-center bg-black/50 px-4 pb-[86px] pt-4 sm:h-[calc(100vh-82px)] sm:px-14 sm:py-8">
                    <div className="w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
                        <div className="mb-4 flex items-start justify-between">
                            <h2 className="text-xl font-semibold">
                                {!!isUpload && "Uploading Video..."}
                                {!!isUploaded && "Uploaded Video"}
                                <span className="block text-sm text-gray-300">
                                    Track your video uploading process.
                                </span>
                            </h2>
                            <button
                                className="h-6 w-6"
                                onClick={() => {
                                    setIsUploading(false);
                                    setIsUploaded(false);
                                }}
                            >
                                <XMarkIcon />
                            </button>
                        </div>
                        <div className="mb-6 flex gap-x-2 border p-3">
                            <div className="w-8 shrink-0">
                                <span className="inline-block w-full rounded-full bg-[#E4D3FF] p-1 text-[#AE7AFF]">
                                    <FilmIcon />
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <h6>Dashboard prototype recording.mp4</h6>
                                <p className="text-sm">16 MB</p>
                                <div class="mt-2 flex items-center">
                                    {!!isUploading && (
                                        <>
                                            <svg
                                                aria-hidden="true"
                                                role="status"
                                                class="mr-2 inline-block h-5 w-5 animate-spin text-gray-200"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="#AE7AFF"
                                                />
                                            </svg>
                                            Uploading...
                                        </>
                                    )}
                                    {!!isUploaded && (
                                        <>
                                            <span className="mr-2 inline-block w-6 text-[#ae7aff]">
                                                <CheckCircleIcon />
                                            </span>
                                            Uploaded Successfully
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                className="border px-4 py-3"
                                onClick={() => {
                                    setIsUploading(false);
                                    setIsUploaded(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[#ae7aff] px-4 py-3 text-black disabled:bg-[#E4D3FF]"
                                disabled={isUploading}
                                onClick={() => {
                                    setIsUploading(false);
                                    setIsUploaded(false);
                                }}
                            >
                                Finish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Video;
