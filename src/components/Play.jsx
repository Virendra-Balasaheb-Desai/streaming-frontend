import React, { useEffect, useState } from "react";
import {
    CheckIcon,
    FolderPlusIcon,
    // HandThumbDownIcon,
    HandThumbUpIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import video from "../api/video";
import { useNavigate, useParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import Loading from "./Loading";
import { formatTimeAgo, formatDuration } from "../utils";
import ErrorState from "./ErrorState";
import { useSelector } from "react-redux";
import like from "../api/like";
import subscription from "../api/subscription";
import comment from "../api/comment";
import playlist from "../api/playlist";
import user from "../api/user";

const Play = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [videoDetails, setVideoDetails] = useState({});
    const [comments, setComments] = useState([]);
    const [playlistList, setPlaylistList] = useState([]);
    const [isSaveOpen, setIsSaveOpen] = useState(false);
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [newPlaylistDescription, setNewPlaylistDescription] = useState("");
    const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);
    const { videoId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { status: isLogin } = useSelector((state) => state.auth);
    const [commentText, setCommentText] = useState("");

    const getPlaylistList = async () => {
        try {
            setError(null);
            // setIsLoading(true);
            const data = await playlist.getUserPlaylistList();
            if (data?.length > 0) {
                console.log("playlists : ", data);
                setPlaylistList([...data]);
            }
        } catch (e) {
            setError(e);
        }
        // finally{
        //     setIsLoading(false);
        // }
    };

    const getVideoDetails = async () => {
        try {
            setError(null);
            setIsLoading(true);
            let fetchedData;

            if (isLogin) {
                fetchedData = await video.getProtectedVideoDetails(videoId);
            } else {
                fetchedData = await video.getVideoDetails(videoId);
            }

            console.log("video details : ", fetchedData);
            console.log("video owner type : ", fetchedData.owner);
            setVideoDetails({ ...videoDetails, ...fetchedData });
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getComments = async () => {
        try {
            setError(null);
            // setIsLoading(true);
            const data = await comment.getVideoComments(videoId);
            const fetchedData = data?.docs;
            setComments([...fetchedData]);
            console.log("comments : ", fetchedData);
        } catch (e) {
            setError(e.message);
        }
        // finally {
        //     setIsLoading(false);
        // }
    };

    const updateVideoView = async () => {
        try {
            const res = await video.updateView(videoId);
            console.log("update video view result : ", res);
        } catch (e) {
            setError(e.message);
        }
    };

    const addVideoToWatchHistory = async () => {
        try {
            const res = await user.addVideoToWatchHistory({ videoId });
            console.log("add video to watch history result : ", res);
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => {
        if (isLogin != null) {
            if (isLogin) {
                console.log(isLogin);
                updateVideoView();
                addVideoToWatchHistory();
                getPlaylistList();
            }
            getVideoDetails();
            getComments();
        }
    }, [isLogin]);

    const getAllVideo = async () => {
        try {
            setError(null);
            const data = await video.getVideos(videoDetails.owner._id);
            const fetchedData = data?.docs;
            setVideos([...fetchedData]);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (videoDetails && videoDetails.owner) getAllVideo();
    }, [videoDetails]);

    const handleVideoClick = (videoId) => {
        navigate(`/play/${videoId}`);
        // reload page
        window.location.reload();
    };

    const likeVideo = async () => {
        try {
            setError(null);
            const res = await like.toggleLikeVideo(videoId);
            console.log("like result : ", res);
            if (res.liked) {
                setVideoDetails((prev) => ({
                    ...prev,
                    liked: res.liked,
                    likeCount: prev.likeCount + 1,
                }));
            } else {
                setVideoDetails((prev) => ({
                    ...prev,
                    liked: res.liked,
                    likeCount: prev.likeCount - 1,
                }));
            }
        } catch (e) {
            setError(e.message);
        }
    };

    const toggleSubscribe = async () => {
        try {
            setError(null);
            const res = await subscription.toggleSubscription(
                videoDetails?.owner
            );
            console.log("subscribe result : ", res);
            if (res.subscribed) {
                setVideoDetails((prev) => ({
                    ...prev,
                    owner: [
                        {
                            ...prev.owner,
                            isSubscribed: res.subscribed,
                            subscribers: prev.owner.subscribers + 1,
                        },
                    ],
                }));
            } else {
                setVideoDetails((prev) => ({
                    ...prev,
                    owner: [
                        {
                            ...prev.owner,
                            isSubscribed: res.subscribed,
                            subscribers: prev.owner.subscribers - 1,
                        },
                    ],
                }));
            }
        } catch (e) {
            setError(e.message);
        }
    };

    const handleAddComment = async () => {
        try {
            setError(null);
            if (!commentText || commentText.trim() === "") {
                setError("Comment cannot be empty");
                return;
            }
            const res = await comment.addComment(videoId, {
                content: commentText,
            });
            console.log("comment result : ", res);
            getComments();
            setCommentText("");
        } catch (e) {
            setError(e.message);
        }
    };

    const handlePlaylistCheck = async (e, playlistId) => {
        try {
            setError(null);
            setIsSaveOpen(false);
            setDisableSaveButton(true);
            console.log(e.target);
            console.log(e.target.checked);
            if (e.target.checked) {
                const res = await playlist.addVideoToPlaylist(
                    playlistId,
                    videoId
                );
                console.log("playlist result : ", res);
            } else {
                const res = await playlist.removeVideoFromPlaylist(
                    playlistId,
                    videoId
                );
                console.log("playlist result : ", res);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setDisableSaveButton(false);
            setPlaylistList((prev) =>
                prev.map((item) => {
                    if (item._id === playlistId) {
                        return {
                            ...item,
                            videos: e.target.checked
                                ? [...item.videos, videoId]
                                : item.videos.filter(
                                      (video) => video !== videoId
                                  ),
                        };
                    }
                    return item;
                })
            );
        }
    };

    const handleCreatePlaylist = async () => {
        try {
            setError(null);
            setIsSaveOpen(false);
            setDisableSaveButton(true);
            const data = await playlist.createPlaylist({
                name: newPlaylistName,
                description: newPlaylistDescription,
            });
            console.log("playlist result : ", data);
            setPlaylistList((prev) => [...prev, data]);
        } catch (e) {
            setError(e.message);
        } finally {
            setDisableSaveButton(false);
            setNewPlaylistName("");
            setNewPlaylistDescription("");
        }
    };

    if (isLoading) return <Loading />;

    if (error)
        return (
            <ErrorState message={error?.message || "Something went wrong"} />
        );

    return (
        <section className="w-full pb-[70px] overflow-y-auto sm:pb-0">
            <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
                <div className="col-span-12 w-full">
                    <div className="relative mb-4 w-full pt-[56%]">
                        <div className="absolute inset-0">
                            <VideoPlayer
                                id="demo-player"
                                publicId={videoDetails?.videoFileId}
                            />
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
                                    &nbsp;
                                    {formatTimeAgo(videoDetails.createdAt)}
                                </p>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                                <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                                    <div className="flex overflow-hidden rounded-lg border">
                                        <button
                                            className="group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 "
                                            onClick={
                                                isLogin ? likeVideo : () => {}
                                            }
                                        >
                                            <span
                                                className={`inline-block w-5 ${
                                                    videoDetails.liked
                                                        ? "text-[#ae7aff]"
                                                        : "text-inherit"
                                                }`}
                                            >
                                                <HandThumbUpIcon />
                                            </span>
                                            {videoDetails.likeCount}
                                        </button>
                                        {/* <button
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
                                        </button> */}
                                    </div>
                                    {/* need a look for work */}
                                    <div className="relative">
                                        <button
                                            type="button"
                                            disabled={disableSaveButton}
                                            onClick={() =>
                                                setIsSaveOpen((prev) => !prev)
                                            }
                                            className={`flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black ${
                                                disableSaveButton
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        >
                                            <span className="inline-block w-5">
                                                <FolderPlusIcon />
                                            </span>
                                            Save
                                        </button>

                                        {isSaveOpen && (
                                            <div className="absolute right-0 top-full z-10 mt-2 w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow-lg shadow-slate-50/30">
                                                <h3 className="mb-4 text-center text-lg font-semibold">
                                                    Save to playlist
                                                </h3>

                                                {isLogin ? (
                                                    <>
                                                        <ul className="mb-4">
                                                            {playlistList.map(
                                                                (
                                                                    playlistName
                                                                ) => {
                                                                    const checkboxId = `${playlistName._id}-checkbox`;

                                                                    return (
                                                                        <li
                                                                            key={
                                                                                playlistName._id
                                                                            }
                                                                            className="mb-2 last:mb-0"
                                                                        >
                                                                            <label
                                                                                className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                                                                htmlFor={
                                                                                    checkboxId
                                                                                }
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    className="peer sr-only"
                                                                                    id={
                                                                                        checkboxId
                                                                                    }
                                                                                    checked={playlistName.videos.includes(
                                                                                        videoId
                                                                                    )}
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handlePlaylistCheck(
                                                                                            e,
                                                                                            playlistName._id
                                                                                        )
                                                                                    }
                                                                                />

                                                                                <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                                                                    <CheckIcon
                                                                                        strokeWidth={
                                                                                            3
                                                                                        }
                                                                                    />
                                                                                </span>

                                                                                {
                                                                                    playlistName.name
                                                                                }
                                                                            </label>
                                                                        </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                        <button
                                                            onClick={() =>
                                                                setIsCreatePlaylistOpen(
                                                                    (prev) =>
                                                                        !prev
                                                                )
                                                            }
                                                            className="flex items-center gap-x-2 rounded-lg bg-[#ae7aff] px-4 py-2 text-white"
                                                        >
                                                            Create New Playlist
                                                        </button>
                                                        {isCreatePlaylistOpen && (
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
                                                                    value={
                                                                        newPlaylistName
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setNewPlaylistName(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />

                                                                <label
                                                                    htmlFor="playlist-description"
                                                                    className="mb-1 inline-block cursor-pointer"
                                                                >
                                                                    Description
                                                                </label>

                                                                <input
                                                                    className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#ae7aff]"
                                                                    id="playlist-description"
                                                                    placeholder="Enter playlist description"
                                                                    value={
                                                                        newPlaylistDescription
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setNewPlaylistDescription(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black"
                                                                    onClick={() =>
                                                                        handleCreatePlaylist()
                                                                    }
                                                                >
                                                                    Create
                                                                </button>
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="flex flex-col">
                                                        <div>
                                                            Please login to
                                                            create playlist
                                                        </div>
                                                        <button
                                                            className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black"
                                                            onClick={() =>
                                                                navigate(
                                                                    "/login"
                                                                )
                                                            }
                                                        >
                                                            Login
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <div
                                className="flex items-center justify-center gap-x-4 cursor-pointer"
                                onClick={() =>
                                    navigate(
                                        `/channel/${videoDetails.owner._id}`
                                    )
                                }
                            >
                                <div className=" h-12 w-12 shrink-0">
                                    <img
                                        src={
                                            videoDetails.owner
                                                ? videoDetails.owner.avatar
                                                : ""
                                        }
                                        alt={
                                            videoDetails.owner
                                                ? videoDetails.owner.fullName
                                                : ""
                                        }
                                        className="h-full w-full rounded-full"
                                    />
                                </div>
                                <div className="block">
                                    <p className="text-gray-200">
                                        {videoDetails.owner
                                            ? videoDetails.owner.fullName
                                            : ""}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {videoDetails.owner
                                            ? videoDetails.owner.subscribers
                                            : 0}{" "}
                                        Subscribers
                                    </p>
                                </div>
                            </div>
                            <div className="block">
                                <button
                                    className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                                    onClick={
                                        isLogin ? toggleSubscribe : () => {}
                                    }
                                >
                                    <span className="inline-block w-5">
                                        <UserPlusIcon strokeWidth={2} />
                                    </span>
                                    {videoDetails.owner
                                        ? videoDetails.owner.isSubscribed
                                            ? "Unsubscribe"
                                            : "Subscribe"
                                        : "Subscribe"}
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
                            {comments?.length || 0} Comments...
                        </h6>
                    </button>
                    <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
                        <div className="block">
                            <h6 className="mb-4 font-semibold">
                                {comments?.length || 0} Comments
                            </h6>
                            {isLogin && (
                                <div className="flex items-center justify-center gap-4">
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                                        placeholder="Add a Comment"
                                        value={commentText}
                                        onChange={(e) =>
                                            setCommentText(e.target.value)
                                        }
                                    />
                                    <button
                                        onClick={handleAddComment}
                                        className="px-2 py-1 rounded-lg bg-blue-500"
                                    >
                                        Comment
                                    </button>
                                </div>
                            )}
                        </div>
                        <hr className="my-4 border-white" />
                        {comments?.length > 0 &&
                            comments?.map((comment) => (
                                <div key={comment._id}>
                                    <div className="flex gap-x-4">
                                        <div className="mt-2 h-11 w-11 shrink-0">
                                            <img
                                                src={comment.owner?.avatar}
                                                alt={comment.owner?.username}
                                                className="h-full w-full rounded-full"
                                            />
                                        </div>
                                        <div className="block">
                                            <p className="flex items-center text-gray-200">
                                                {comment.owner.fullName}
                                                &nbsp;&middot;&nbsp;
                                                <span className="text-sm">
                                                    {formatTimeAgo(
                                                        comment.createdAt
                                                    )}
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
                        .filter((video) => video.isPublised)
                        .map((video) => (
                            <div
                                key={video._id}
                                className="w-full gap-x-2 border pr-2 md:flex"
                                onClick={() => handleVideoClick(video._id)}
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
