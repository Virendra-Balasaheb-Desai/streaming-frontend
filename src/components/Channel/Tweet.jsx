import React, { useState } from "react";
import { tweets } from "../data";
import {
    UsersIcon,
    HandThumbDownIcon,
    HandThumbUpIcon,
    FaceSmileIcon,
    EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

const Tweet = () => {
    const [isOwner, setIsOwner] = useState(true);

    return (
        <>
            {!!isOwner && (
                <div className="mt-2 border pb-2">
                    <textarea
                        className="mb-2 h-10 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
                        placeholder="Write a tweet"
                    ></textarea>
                    <div className="flex items-center justify-end gap-x-3 px-3">
                        <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                            <FaceSmileIcon strokeWidth={2} />
                        </button>
                        <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                            <EllipsisHorizontalIcon strokeWidth={2} />
                        </button>
                        <button className="bg-[#ae7aff] px-3 py-2 font-semibold text-black">
                            Send
                        </button>
                    </div>
                </div>
            )}
            {tweets.length <= 0 ? (
                <div className="flex justify-center p-4">
                    <div className="w-full max-w-sm text-center">
                        <p className="mb-3 w-full">
                            <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                                <span className="inline-block w-6">
                                    <UsersIcon className="w-6" />
                                </span>
                            </span>
                        </p>
                        <h5 className="mb-2 font-semibold">No Tweets</h5>
                        <p>
                            This channel has yet to make a{" "}
                            <strong>Tweet</strong>.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="py-4">
                    {tweets.map((tweet) => (
                        <div
                            key={tweet.id}
                            className="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent"
                        >
                            <div className="h-14 w-14 shrink-0">
                                <img
                                    src={tweet.owner.avatar}
                                    alt={tweet.owner.fullName}
                                    className="h-full w-full rounded-full"
                                />
                            </div>
                            <div className="w-full">
                                <h4 className="mb-1 flex items-center gap-x-2">
                                    <span className="font-semibold">
                                        {tweet.owner.fullName}
                                    </span>
                                    &nbsp;
                                    <span className="inline-block text-sm text-gray-400">
                                        {tweet.createdAt}
                                    </span>
                                </h4>
                                <p className="mb-2">{tweet.content}</p>
                                <div className="flex gap-4">
                                    <button
                                        className={`group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]`}
                                        data-like-count={tweet.likeCount}
                                        data-like-count-alt={
                                            tweet.liked
                                                ? tweet.likeCount - 1
                                                : tweet.likeCount + 1
                                        }
                                    >
                                        <HandThumbUpIcon
                                            className={`h-5 w-5 ${
                                                tweet.liked
                                                    ? "text-[#ae7aff] group-focus:text-inherit"
                                                    : "text-inherit group-focus:text-[#ae7aff]"
                                            }`}
                                        />
                                    </button>
                                    <button
                                        className={`group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]`}
                                        data-dislike-count={tweet.dislikeCount}
                                        data-dislike-count-alt={
                                            tweet.disliked
                                                ? tweet.dislikeCount - 1
                                                : tweet.dislikeCount + 1
                                        }
                                    >
                                        <HandThumbDownIcon
                                            className={`h-5 w-5 ${
                                                tweet.disliked
                                                    ? "text-[#ae7aff] group-focus:text-inherit"
                                                    : "text-inherit group-focus:text-[#ae7aff]"
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Tweet;
