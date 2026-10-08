import React, { useEffect, useState } from "react";
import { classNames } from "../utils";
import {
    EyeIcon,
    HeartIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
    UserIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import ErrorState from "./ErrorState";
import video from "../api/video";
import subscription from "../api/subscription";

const Dashboard = () => {
    const [toEdit, setToEdit] = useState(null);
    const [editedVideoData, setEditedVideoData] = useState({
        title: "",
        description: "",
        thumbnail: null,
        thumbnailPreview: null,
    });
    const [toDelete, setToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [videos, setVideos] = useState([]);
    const userId = useSelector((state) => state.auth.user?._id);
    const [totalLikes, setTotalLikes] = useState(0);
    const [totalViews, setTotalViews] = useState(0);
    const [totalSubscribers, setTotalSubscribers] = useState(0);

    const getSubscribers = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await subscription.getChannelSubscribers(userId);
            console.log("Total Subscribers", data);
            setTotalSubscribers(data?.totalsubscribers);
        } catch (e) {
            setError(e);
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const getAllVideo = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await video.getVideos(userId);
            const fetchedData = data?.docs;
            console.log("Fetched Data", fetchedData);
            setVideos([...videos, ...fetchedData]);
            fetchedData.forEach((video) => {
                setTotalLikes((prev) => prev + video.likeCount);
                setTotalViews((prev) => prev + video.views);
            });
            console.log(userId);
        } catch (e) {
            console.log(e);
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getAllVideo();
        getSubscribers();
    }, []);

    const handlePusblishedToggle = async (videoId) => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await video.togglePublishStatus(videoId);
            console.log("Toggled Status", data);
            setVideos(
                videos.map((v) =>
                    v._id === videoId
                        ? { ...v, isPublised: data.isPublised }
                        : v
                )
            );
        } catch (e) {
            setError(e);
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedVideoData({
            ...editedVideoData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setEditedVideoData({
            ...editedVideoData,
            thumbnail: file,
            thumbnailPreview: url,
        });
    };

    const handleUpdateVideo = async (videoId) => {
        try {
            setError(null);
            setIsLoading(true);
            const { title, description, thumbnail } = editedVideoData;
            console.log("Edited Video Data", editedVideoData);

            if (!title?.trim() || !description?.trim()) {
                setError("Please enter a valid title and description");
                return;
            }

            const data = await video.updateVideo(videoId, {
                title,
                description,
            });

            let updatedThumbnail = toEdit.thumbnail;
            if (thumbnail) {
                const formData = new FormData();
                formData.append("thumbnail", thumbnail);
                const data = await video.updateVideoThumbnail(
                    videoId,
                    formData
                );
                updatedThumbnail = data.thumbnail;
            }

            setVideos(
                videos.map((v) =>
                    v._id === videoId
                        ? {
                              ...v,
                              title: data.title,
                              description: data.description,
                              thumbnail: updatedThumbnail,
                          }
                        : v
                )
            );

            setToEdit(null);
            setEditedVideoData({
                title: "",
                description: "",
                thumbnail: null,
                thumbnailPreview: null,
            });
        } catch (e) {
            setError(e);
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteVideo = async (videoId) => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await video.deleteVideo(videoId);
            console.log("Deleted Video", data);
            setVideos(videos.filter((v) => v._id !== videoId));
            setToDelete(null);
        } catch (e) {
            setError(e);
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <Loading />;
    if (error)
        return (
            <ErrorState message={error?.message || "Something went wrong"} />
        );

    return (
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-y-6 px-4 py-8 ">
            <div className="flex flex-wrap justify-between gap-4">
                <div className="block">
                    <h1 className="text-2xl font-bold">
                        Welcome Back, React Patterns
                    </h1>
                    <p className="text-sm text-gray-300">
                        Seamless Video Management, Elevated Results.
                    </p>
                </div>
                <div className="block">
                    <button className="inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black">
                        <PlusIcon className="h-5 w-5" strokeWidth={2} /> Upload
                        video
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
                {[
                    { Icon: EyeIcon, title: "Total views", count: totalViews },
                    {
                        Icon: UserIcon,
                        title: "Total subscribers",
                        count: totalSubscribers,
                    },
                    {
                        Icon: HeartIcon,
                        title: "Total likes",
                        count: totalLikes,
                    },
                ].map(({ title, Icon, count }) => (
                    <div key={title} className="border p-4">
                        <div className="mb-4 block">
                            <span className="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
                                <Icon />
                            </span>
                        </div>
                        <h6 className="text-gray-300">{title}</h6>
                        <p className="text-3xl font-semibold">{count}</p>
                    </div>
                ))}
            </div>
            <div className="w-full pb-6">
                <table className="w-full max-w-[1200px] border-collapse border text-white">
                    <thead>
                        <tr>
                            <th className="border-collapse border-b p-4">
                                Status
                            </th>
                            <th className="border-collapse border-b p-4">
                                Status
                            </th>
                            <th className="border-collapse border-b p-4">
                                Uploaded
                            </th>
                            <th className="border-collapse border-b p-4">
                                Rating
                            </th>
                            <th className="border-collapse border-b p-4">
                                Date uploaded
                            </th>
                            <th className="border-collapse border-b p-4"></th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {videos.map((video) => (
                            <tr key={video._id} className="group border">
                                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                    <div className="flex justify-center">
                                        <label
                                            htmlFor={"vid-pub-" + video._id}
                                            className="relative inline-block w-12 cursor-pointer overflow-hidden"
                                        >
                                            <input
                                                type="checkbox"
                                                id={"vid-pub-" + video._id}
                                                className="peer sr-only"
                                                defaultChecked={
                                                    video.isPublised
                                                }
                                                onChange={() => {
                                                    handlePusblishedToggle(
                                                        video._id
                                                    );
                                                }}
                                            />
                                            <span className="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-[#ae7aff] peer-checked:after:left-7"></span>
                                        </label>
                                    </div>
                                </td>
                                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                    <div className="flex justify-center">
                                        <span
                                            className={classNames(
                                                "inline-block rounded-2xl border px-1.5 py-0.5",
                                                video.isPublised
                                                    ? "border-green-600 text-green-600"
                                                    : "border-orange-600 text-orange-600"
                                            )}
                                        >
                                            {video.isPublised
                                                ? "Published"
                                                : "Unpublished"}
                                        </span>
                                    </div>
                                </td>
                                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                    <div className="flex items-center gap-4">
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={video.owner[0].avatar}
                                            alt={video.owner[0].fullName}
                                        />
                                        <h3 className="font-semibold">
                                            {video.title}
                                        </h3>
                                    </div>
                                </td>
                                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                    <div className="flex justify-center gap-4">
                                        <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
                                            {video.likeCount} likes
                                        </span>
                                        {/* <span className="inline-block rounded-xl bg-red-200 px-1.5 py-0.5 text-red-700">
                                            {video.dislikeCount} dislikes
                                        </span> */}
                                    </div>
                                </td>
                                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                    <div className="flex items-center justify-center">
                                        {new Date(
                                            video.createdAt
                                        ).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                    <div className="flex gap-4">
                                        <button
                                            className="h-5 w-5 hover:text-[#ae7aff]"
                                            onClick={() =>
                                                setToDelete(video._id)
                                            }
                                        >
                                            <TrashIcon />
                                        </button>
                                        <button
                                            className="h-5 w-5 hover:text-[#ae7aff]"
                                            onClick={() => {
                                                setToEdit(video);
                                                setEditedVideoData({
                                                    title: video.title,
                                                    description:
                                                        video.description,
                                                });
                                            }}
                                        >
                                            <PencilIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Popup */}
            {!!toEdit && (
                <div className="fixed inset-0 top-[calc(66px)] z-10 flex flex-col bg-black/50 px-4 pb-[86px] pt-4 sm:top-[calc(82px)] sm:px-14 sm:py-8">
                    <div className="mx-auto w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
                        <div className="mb-4 flex items-start justify-between">
                            <h2 className="text-xl font-semibold">
                                Edit Video
                                <span className="block text-sm text-gray-300">
                                    Share where you&apos;ve worked on your
                                    profile.
                                </span>
                            </h2>
                            <button
                                className="h-6 w-6"
                                onClick={() => {
                                    setToEdit(null);
                                    setEditedVideoData(null);
                                }}
                            >
                                <XMarkIcon />
                            </button>
                        </div>

                        <label
                            htmlFor="thumbnail"
                            className="mb-1 inline-block"
                        >
                            Thumbnail<sup>*</sup>
                        </label>
                        <label
                            className="relative mb-4 block cursor-pointer border border-dashed p-2 after:absolute after:inset-0 after:bg-transparent hover:after:bg-black/10"
                            htmlFor="thumbnail"
                        >
                            <input
                                type="file"
                                className="sr-only"
                                id="thumbnail"
                                name="thumbnail"
                                onChange={handleFileChange}
                                required
                            />
                            <img
                                src={
                                    editedVideoData?.thumbnailPreview ||
                                    toEdit?.thumbnail
                                }
                                alt={editedVideoData?.title || toEdit?.title}
                            />
                        </label>

                        <div className="mb-6 flex flex-col gap-y-4">
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
                                    required
                                    onChange={handleChange}
                                    name="title"
                                    value={editedVideoData?.title}
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
                                    onChange={handleChange}
                                    name="description"
                                    value={editedVideoData?.description}
                                ></textarea>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                className="border px-4 py-3"
                                onClick={() => {
                                    setToEdit(null);
                                    setEditedVideoData(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[#ae7aff] px-4 py-3 text-black disabled:bg-[#E4D3FF]"
                                onClick={() => handleUpdateVideo(toEdit?._id)}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Delete Popup */}
            {!!toDelete && (
                <div className="fixed inset-0 top-[calc(66px)] z-10 flex flex-col bg-black/50 px-4 pb-[86px] pt-4 sm:top-[calc(82px)] sm:px-14 sm:py-8">
                    <div className="mx-auto w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
                        <div className="mb-6 flex items-start gap-4">
                            <span className="inline-block h-8 w-8 shrink-0 rounded-full bg-red-200 p-1 text-red-700">
                                <TrashIcon />
                            </span>
                            <h2 className="text-xl font-semibold">
                                Delete Video
                                <span className="block text-sm text-gray-300">
                                    Are you sure you want to delete this video?
                                    Once its deleted, you will not be able to
                                    recover it.
                                </span>
                            </h2>
                            <button
                                className="ml-auto h-6 w-6 shrink-0"
                                onClick={() => setToDelete(null)}
                            >
                                <XMarkIcon />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                className="col-span-2 border px-4 py-3 sm:col-span-1"
                                onClick={() => setToDelete(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="col-span-2 bg-red-700 px-4 py-3 disabled:bg-[#E4D3FF] sm:col-span-1"
                                onClick={() => handleDeleteVideo(toDelete)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Dashboard;
